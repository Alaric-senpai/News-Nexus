const { writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction
  ? './src/environments/environment.prod.ts'
  : './src/environments/environment.ts';

const envConfigFile = `
export const environment = {
  production: ${isProduction},
  apiKey: '${process.env['API_KEY']}'
};
`;

writeFile(targetPath, envConfigFile, (err: NodeJS.ErrnoException | null) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Environment file created at ${targetPath}`);
  }
});
