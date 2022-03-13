interface UniqueIdRanges {
  [k: string]: [number, number];
};

type defaultDictionaries = 'number' | 'alpha' | 'alpha_lower' | 'alpha_upper' | 'alphanum' | 'alphanum_lower' | 'alphanum_upper' | 'hex';

export interface UniqueIdOptions {
  dictionary: string[] | defaultDictionaries;
  shuffle: boolean;
  debug: boolean;
  length: number;
};

export const DEFAULT_UUID_LENGTH: number = 6;

const DEFAULT_OPTIONS: UniqueIdOptions = {
  dictionary: 'alphanum',
  shuffle: true,
  debug: false,
  length: DEFAULT_UUID_LENGTH,
};

export default class UniqueId extends Function {
  static default: typeof UniqueId = UniqueId;

  public counter: number;
  public debug: boolean;
  public dict: string[];
  public version: string;
  public dictIndex: number = 0;
  public dictRange: number[] =[];
  public lowerBound: number = 0;
  public upperBound: number = 0;
  public dictLength: number = 0;
  public uuidLength: number;

  protected _digit_first_ascii: number = 48;
  protected _digit_last_ascii: number = 58;
  protected _alpha_lower_first_ascii: number = 97;
  protected _alpha_lower_last_ascii: number = 123;
  protected _hex_last_ascii: number = 103;
  protected _alpha_upper_first_ascii: number = 65;
  protected _alpha_upper_last_ascii: number = 91;

  protected _number_dict_ranges: UniqueIdRanges = {
    digits: [this._digit_first_ascii, this._digit_last_ascii],
  };

  protected _alpha_dict_ranges: UniqueIdRanges = {
    lowerCase: [this._alpha_lower_first_ascii, this._alpha_lower_last_ascii],
    upperCase: [this._alpha_upper_first_ascii, this._alpha_upper_last_ascii],
  };

  protected _alpha_lower_dict_ranges: UniqueIdRanges = {
    lowerCase: [this._alpha_lower_first_ascii, this._alpha_lower_last_ascii],
  };

  protected _alpha_upper_dict_ranges: UniqueIdRanges = {
    upperCase: [this._alpha_upper_first_ascii, this._alpha_upper_last_ascii],
  };

  protected _alphanum_dict_ranges: UniqueIdRanges = {
    digits: [this._digit_first_ascii, this._digit_last_ascii],
    lowerCase: [this._alpha_lower_first_ascii, this._alpha_lower_last_ascii],
    upperCase: [this._alpha_upper_first_ascii, this._alpha_upper_last_ascii],
  };

  protected _alphanum_lower_dict_ranges: UniqueIdRanges = {
    digits: [this._digit_first_ascii, this._digit_last_ascii],
    lowerCase: [this._alpha_lower_first_ascii, this._alpha_lower_last_ascii],
  };

  protected _alphanum_upper_dict_ranges: UniqueIdRanges = {
    digits: [this._digit_first_ascii, this._digit_last_ascii],
    upperCase: [this._alpha_upper_first_ascii, this._alpha_upper_last_ascii],
  };

  protected _hex_dict_ranges: UniqueIdRanges = {
    decDigits: [this._digit_first_ascii, this._digit_last_ascii],
    alphaDigits: [this._alpha_lower_first_ascii, this._hex_last_ascii],
  };

  /* tslint:disable consistent-return */
  protected log = (...args: any[]): void => {
    const finalArgs = [...args];
    finalArgs[0] = `[short-unique-id] ${args[0]}`;
    /* tslint:disable no-console */
    if (this.debug === true) {
      if (typeof console !== 'undefined' && console !== null) {
        return console.log(...finalArgs);
      }
    }
    /* tslint:enable no-console */
  };
  /* tslint:enable consistent-return */

  setDictionary = (dictionary: string[] | defaultDictionaries, shuffle?: boolean): void => {
    let finalDict: string[];

    if (dictionary && Array.isArray(dictionary) && dictionary.length > 1) {
      finalDict = dictionary as string[];
    } else {
      finalDict = [];

      let i;

      this.dictIndex = i = 0;

      const rangesName = `_${dictionary as defaultDictionaries}_dict_ranges`;
      const ranges: UniqueIdRanges = this[rangesName as keyof UniqueId];

      Object.keys(ranges).forEach((rangeType) => {
        const rangeTypeKey = rangeType;

        this.dictRange = ranges[rangeTypeKey];

        this.lowerBound = this.dictRange[0];
        this.upperBound = this.dictRange[1];

        for (
          this.dictIndex = i = this.lowerBound;
          this.lowerBound <= this.upperBound ? i < this.upperBound : i > this.upperBound;
          this.dictIndex = this.lowerBound <= this.upperBound ? i += 1 : i -= 1
        ) {
          finalDict.push(String.fromCharCode(this.dictIndex));
        }
      });
    }

    if (shuffle) {
      const PROBABILITY = 0.5;
      finalDict = finalDict.sort(() => Math.random() - PROBABILITY);
    }

    this.dict = finalDict;

    this.dictLength = this.dict.length;// Resets internal counter.
    this.counter = 0;
  };

  seq = (): string => {
    return this.sequentialUUID();
  };

  sequentialUUID = (): string => {
    let counterDiv: number;
    let counterRem: number;
    let id: string = '';

    counterDiv = this.counter;

    do {
      counterRem = counterDiv % this.dictLength;
      counterDiv = Math.trunc(counterDiv / this.dictLength);
      id += this.dict[counterRem];
    } while (counterDiv !== 0);

    this.counter += 1;

    return id;
  };

  randomUUID = (uuidLength: number = this.uuidLength || DEFAULT_UUID_LENGTH): string => {
    let id: string;
    let randomPartIdx: number;
    let j: number;

    if ((uuidLength === null || typeof uuidLength === 'undefined') || uuidLength < 1) {
      throw new Error('Invalid UUID Length Provided');
    }

    const isPositive = uuidLength >= 0;

    // Generate random ID parts from Dictionary.
    id = '';
    for (
      j = 0;
      j < uuidLength;
      j += 1
    ) {
      randomPartIdx = parseInt(
        (Math.random() * this.dictLength).toFixed(0),
        10,
      ) % this.dictLength;
      id += this.dict[randomPartIdx];
    }

    // Return random generated ID.
    return id;
  };

  availableUUIDs = (uuidLength: number = this.uuidLength): number => {
    return parseFloat(
      Math.pow([...new Set(this.dict)].length, uuidLength).toFixed(0),
    );
  };

  approxMaxBeforeCollision = (rounds: number = this.availableUUIDs(this.uuidLength)): number => {
    return parseFloat(
      Math.sqrt((Math.PI / 2) * rounds).toFixed(20),
    );
  };

  collisionProbability = (
    rounds: number = this.availableUUIDs(this.uuidLength),
    uuidLength: number = this.uuidLength,
  ): number => {
    return parseFloat(
      (
        this.approxMaxBeforeCollision(rounds) / this.availableUUIDs(uuidLength)
      ).toFixed(20),
    );
  };

  uniqueness = (rounds: number = this.availableUUIDs(this.uuidLength)): number => {
    const score = parseFloat(
      (1 - (
        this.approxMaxBeforeCollision(rounds) / rounds
      )).toFixed(20),
    );
    return (
      score > 1
    ) ? (
      1
    ) : (
      (score < 0) ? 0 : score
    );
  };

  stamp = (finalLength: number): string => {
    if (typeof finalLength !== 'number' || finalLength < 10) {
      throw new Error('Param finalLength must be number greater than 10');
    }

    const hexStamp = Math.floor(+new Date() / 1000).toString(16);

    const idLength = finalLength - 9;

    const rndIdx = Math.round(Math.random() * ((idLength > 15) ? 15 : idLength));

    const id = this.randomUUID(idLength);

    return `${id.substr(0, rndIdx)}${hexStamp}${id.substr(rndIdx)}${rndIdx.toString(16)}`;
  };

  parseStamp = (stamp: string): Date => {
    if (stamp.length < 10) {
      throw new Error('Stamp length invalid');
    }

    const rndIdx = parseInt(stamp.substr(stamp.length - 1, 1), 16);

    return new Date(parseInt(stamp.substr(rndIdx, 8), 16) * 1000);
  };

  constructor(argOptions: Partial<UniqueIdOptions> = {}) {
    super();

    const options: UniqueIdOptions = {
      ...DEFAULT_OPTIONS,
      ...argOptions as Partial<UniqueIdOptions>,
    };

    this.counter = 0;
    this.debug = false;
    this.dict = [];

    const {
      dictionary,
      shuffle,
      length,
    } = options;

    this.uuidLength = length;

    this.setDictionary(dictionary, shuffle);

    this.debug = options.debug;
    this.log(this.dict);
    this.log((`Generator instantiated with Dictionary Size ${this.dictLength}`));

    return new Proxy(this, {
      apply: (target, that, args) => this.randomUUID(...args),
    });
  }
}