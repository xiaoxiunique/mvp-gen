/**
 * 1. load config
 * 2. generate models via db type
 */
import { load } from './config';
import * as gulp from 'gulp';
import gulpRename from 'gulp-rename';
// @ts-ignore
import h from 'gulp-nunjucks-render';
import { Factory } from './engine/factory';
import * as lodash from 'lodash';
import path from 'path';

export function build() {
  Factory.init();
  const config = load();
  const parser = Factory.getHandler('MONGODB');
  const models = parser?.generate(config);

  if (!models) {
    console.error('models is Empty');
    return;
  }

  const enable = config.enable;

  for (const model of models) {
    for (const template of Object.keys(config.template[config.enable].path)) {
      const ext = config.template[config.enable].ext;
      const filename = lodash.replace(
        template.substr(0, template.indexOf('.t')) + `.${ext}`,
        'Bean',
        model.name
      );
      const filepath = path.join(
        config.template[config.enable].out,
        enable,
        // @ts-ignore
        config.template[config.enable].path[template].base
      );

      gulp
        .src(path.join(__dirname, 'template', enable, template))
        .pipe(
          h({
            data: {
              model: model,
              packagePath: path.join('template', enable, template)
            },
            envOptions: {
              tags: {
                blockStart: '<%',
                blockEnd: '%>',
                variableStart: '<$',
                variableEnd: '$>',
                commentStart: '<#',
                commentEnd: '#>'
              }
            }
          })
        )
        .pipe(gulpRename(filename))
        .pipe(gulp.dest(filepath));
    }
  }

  console.info('handle successful');
  setTimeout(() => {
    process.exit();
  }, 1000);
}

build();