declare namespace NodeJS {
  export interface ProcessEnv {
    WEBHOOK_URL: string;
    TRAVIS_BUILD_WEB_URL: string;
  }
}
