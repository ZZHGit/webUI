/**
 * this is MyClass description.
 * 一个关于动物的类
 * 如果你想了解关于人的类的详情，请参考 {@link Person}
 * @see https://esdoc.org/manual/tags.html
 * @extends {Animal}
 * @type {Object}
 * @todo 需要完善某些功能
 * @example
 * let myClass = new MyClass();
 */

export class MyClass {
  /**
   * this is constructor description.
   * @param {number} arg1 this is arg1 description.
   * @param {string[]} arg2 this is arg2 description.
   * @return {number} result of the sum value.
   */
  constructor(arg1, arg2) {
    return arg1 + arg2;
  }
}

/**
 * 一个关于动物的类
 * 如果你想了解关于人的类的详情，请参考 {@link Person}
 * @author 赵金添 <729234283@qq.com>
 * @see https://github.com/zhaotoday/esdoc
 * @todo 需要完善某些功能
 * @example
 * const dog = new Animal()
 */
class Animal {
  /**
   * 构造方法
   * @param {string} [name=''] 名字
   * @param {number} [age=0] 年龄
   * @param {string[]} [abilities=[]] 拥有的能力
   */
  constructor(name = '', age = 0, abilities = []) {
    /**
     * 名字
     * @type {string}
     */
    this.name = name;

    /**
     * 年龄
     * @type {number}
     */
    this.age = age;

    /**
     * 拥有的能力
     * @type {string[]}
     */
    this.abilities = abilities;

    /**
     * 拥有的腿的数量
     * @type {number}
     */
    this.legs = 4;

    /**
     * 朋友
     * @type {Object}
     * @property {number} friend.name 名字
     * @property {string} friend.age 年龄
     */
    this.friend = {
      name: 'chen',
      age: 30,
    };
  }

  /**
   * 获取
   * @type {string}
   */
  get value() {
    return this.name;
  }

  /**
   * 设置
   * @type {string}
   */
  set value(name) {
    this.name = name;
  }

  /**
   * 吃饭方法（该方法必须被子类重写）
   * @abstract
   */
  // eslint-disable-next-line class-methods-use-this
  eat() {}
}

/**
 * 一个关于人的类，继承自 Animal 类
 * @extends {Animal}
 * @example
 * const person = new Person({
 *   name: 'zjt',
 *   age: 29,
 *   abilities: ['eat', 'speak', 'run']
 * })
 */
class Person extends Animal {
  /**
   * 财产
   * @type {number}
   */
  constructor() {
    super();
    // eslint-disable-next-line no-underscore-dangle
    this._money = 100;
  }

  /**
   * 吃饭方法（重写了父类的 eat 方法）
   * @override
   */
  // eslint-disable-next-line class-methods-use-this
  eat() {
    // eslint-disable-next-line no-console
    console.log('I eat food.');
    return this;
  }

  /**
   * 获取他说的话
   * @param {string} [words=''] 话
   * @return {string}
   */
  getWords(words = '') {
    return `${this.name} said: ${words}`;
  }

  /**
   * 获取人的信息
   * @return {Object}
   * @property {string} name 名称
   * @property {number} age 年龄
   */
  getInfo() {
    return {
      name: this.name,
      age: this.age,
    };
  }

  /**
   * 设置人的信息
   * @param {string} name 名称
   * @param {number} [age=10] 年龄
   */
  setInfo({ name, age = 10 }) {
    this.name = name;
    this.age = age;
  }

  /**
   * 添加能力
   * @param {...string} abilities 欲添加的能力
   */
  addAbilities(...abilities) {
    this.abilities.push(...abilities);
  }

  /**
   * 获取财产
   * @return {number}
   */
  _getMoney() {
    // eslint-disable-next-line no-underscore-dangle
    return this._money;
  }
}

function testobj({ A }) {
  return { a: { ...A } };
}

if (require.main === module) {
  // 创建 person 对象
  const person = new Person({
    name: 'zjt',
    age: 29,
    abilities: ['eat', 'speak', 'run'],
  });

  person.name = 'zhaojintian';
  person.addAbilities('sing', 'ask');
  // eslint-disable-next-line no-console
  console.log(person.getWords('Hello.'));
  // eslint-disable-next-line no-console
  console.log(person);
  console.info(`Starting ......`);
  const clientConfig = {
    module: {
      rules: [
        {
          test: '1',
          include: '3',
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: ['transform-react-jsx-self'],
          },
        },
        {
          test: '2',
        },
      ],
    },
  };
  const { options } = clientConfig.module.rules.find(
    x => x.loader === 'babel-loader',
  );
  // eslint-disable-next-line no-console
  console.log(options);
  options.plugins = ['react-hot-loader/babel'].concat(options.plugins || []);
  // eslint-disable-next-line no-console
  console.log(options.plugins);

  // let appPromiseResolve;
  // appPromise = new Promise(resolve => (appPromiseResolve = resolve));
  const appPromise = new Promise(
    // eslint-disable-next-line no-unused-vars
    (resolve, reject) => {
      setTimeout(() => {
        resolve('Success!'); // Yay! Everything went well!
      }, 2500);
    },
    // resolve('yes'),
  );
  Promise.resolve().then(successMessage => {
    // eslint-disable-next-line no-console
    console.log(`222${successMessage}`);
  });
  appPromise.then(successMessage => {
    // eslint-disable-next-line no-console
    console.log(`111${successMessage}`);
  });

  // appPromiseResolve();
  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.log('32');
  }, 5000);
  // eslint-disable-next-line no-console
  console.log('[\x1b[35mHMR\x1b[0m] text');

  const A = { a: 1 };
  const b = testobj({ A });
  console.info(b);
  A.a = 2;
  console.info(A);
  console.info(A.a);
  console.info(b);
  console.info(b.a.a);
}

/**
 * @deprecated 该类已弃用，请用 Animal 代替
 */
/*
export class MyAnimal {
  // MyAnimal 的实现代码
}
*/
export default Person;
