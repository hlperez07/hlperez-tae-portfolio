/**
 * Environment Configuration
 * Supports QA and PROD environments
 */

export interface EnvironmentConfig {
  name: string;
  baseURL: string;
  timeout: number;
  retries: number;
}

const environments: Record<string, EnvironmentConfig> = {
  qa: {
    name: 'QA',
    baseURL: 'https://www.saucedemo.com',
    timeout: 30000,
    retries: 2,
  },
  prod: {
    name: 'PROD',
    baseURL: 'https://www.saucedemo.com',
    timeout: 30000,
    retries: 1,
  },
};

/**
 * Get environment configuration
 * Default to QA if ENV is not set
 */
export function getEnvironment(): EnvironmentConfig {
  const env = process.env.ENV || 'qa';
  const config = environments[env.toLowerCase()];
  
  if (!config) {
    console.warn(`Environment "${env}" not found. Defaulting to QA.`);
    return environments.qa;
  }
  
  console.log(`Running tests in ${config.name} environment`);
  return config;
}

export default getEnvironment();
