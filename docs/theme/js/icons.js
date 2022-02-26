import {defer, map, reduce, switchMap, zip} from 'rxjs';

import {base, read, resolve, write} from './_';

// ('use strict');
/* ------------------------------------------------------------------------- */
/* Compute icon mappings */
const icons$ = defer(() => resolve('**/*.svg', {cwd: 'material/.icons'})).pipe(
  reduce(
    (index, file) =>
      index.set(file.replace(/\.svg$/, '').replace(/\//g, '-'), file),
    new Map(),
  ),
);
/* Compute emoji mappings (based on Twemoji) */
const emojis$ = defer(() => resolve('venv/**/twemoji_db.py')).pipe(
  switchMap((file) => read(file)),
  map((data) => {
    const [, payload] = data.match(/^emoji = ({.*})$.alias/ms);
    return Object.entries(JSON.parse(payload)).reduce(
      (index, [name, {unicode}]) =>
        index.set(name.replace(/(^:|:$)/g, ''), `${unicode}.svg`),
      new Map(),
    );
  }),
);
/* Build search index for icons and emojis */
const index$ = zip(icons$, emojis$).pipe(
  map(([icons, emojis]) => {
    const cdn = 'https://raw.githubusercontent.com';
    return {
      icons: {
        base: `${cdn}/squidfunk/mkdocs-material/master/material/.icons/`,
        data: Object.fromEntries(icons),
      },
      emojis: {
        base: `${cdn}/twitter/twemoji/master/assets/svg/`,
        data: Object.fromEntries(emojis),
      },
    };
  }),
  switchMap((data) =>
    write(
      `${base}/overrides/assets/javascripts/iconsearch_index.json`,
      JSON.stringify(data),
    ),
  ),
);

export {};

/* ------------------------------------------------------------------------- */
