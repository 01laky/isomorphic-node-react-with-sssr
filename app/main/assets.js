import { isProduction } from '../../config/app';

const getLinks = () => {
  const links = [{ rel: 'stylesheet', href: '/styles/main.css' }];
  return isProduction ? links : links.filter(link => link.rel !== 'stylesheet');
};

const links = getLinks();

export default {
  links
};
