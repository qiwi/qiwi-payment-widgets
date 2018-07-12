import test from './test.config';
import production from './production.config';
import development from './development.config';
let env = process.env.NODE_ENV || 'development';
let config = {
    test,
    development,
    production
};
export default config[env];