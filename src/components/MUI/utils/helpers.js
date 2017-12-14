import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

export function titleize(string) {
  return string
    .split('-')
    .map(word => word.split(''))
    .map(letters => {
      const first = letters.shift();
      return [first.toUpperCase(), ...letters].join('');
    })
    .join(' ');
}

export function pageToTitle(page) {
  if (page.title) {
    return page.title;
  }

  const name = page.path.replace(/.*\//, '');

  if (page.path.indexOf('/api') === 0) {
    return upperFirst(camelCase(name));
  }

  return titleize(name);
}
