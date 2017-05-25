import { BigNumber } from 'bignumber.js' // TODO change to BN
import * as us from 'underscore'

interface Provider {
  send(payload: any, callback: (e: Error, val: any) => void)
}
interface Account {
  address: string
  privateKey: string
  publicKey: string

}
interface PrivateKey {
  address: string
  Crypto: {
    cipher: string,
    ciphertext: string,
    cipherparams: {
      iv: string
    },
    kdf: string,
    kdfparams: {
      dklen: number,
      n: number,
      p: number,
      r: number,
      salt: string
    },
    mac: string
  },
  id: string,
  version: number
}

interface Signature {
  message: string
  hash: string
  r: string
  s: string
  v: string
}
interface Tx {
  nonce?: string | number
  chainId?: string | number
  to?: string
  data?: string
  value?: string | number
  gas?: string | number
  gasPrice?: string | number


}
interface WebsocketProvider extends Provider { }
interface HttpProvider extends Provider { }
interface IpcProvider extends Provider { }
type Unit = "kwei" | "femtoether" | "babbage" | "mwei" | "picoether" | "lovelace" | "qwei" | "nanoether" | "shannon" | "microether" | "szabo" | "nano" | "micro" | "milliether" | "finney" | "milli" | "ether" | "kether" | "grand" | "mether" | "gether" | "tether"
interface Iban { }
interface Utils {
  BN: BigNumber // TODO only static-definition
  isBN(any): boolean
  isBigNumber(any): boolean
  isAddress(any): boolean
  isHex(any): boolean
  _: us.UnderscoreStatic
  asciiToHex(val: string): string
  hexToAscii(val: string): string
  bytesToHex(val: number[]): string
  numberToHex(val: number | BigNumber): string
  checkAddressChecksum(address: string): boolean
  fromAscii(val: string): string
  fromDecimal(val: string | number | BigNumber): string
  fromUtf8(val: string): string
  fromWei(val: string | number | BigNumber, unit: Unit): string | BigNumber
  hexToBytes(val: string): number[]
  hexToNumber(val: string | number | BigNumber): number
  hexToNumberString(val: string | number | BigNumber): string
  hexToString(val: string): string
  hexToUtf8(val: string): string
  keccak256(val: string): string
  leftPad(string: string, chars: number, sign: string): string
  padLeft(string: string, chars: number, sign: string): string
  rightPad(string: string, chars: number, sign: string): string
  padRight(string: string, chars: number, sign: string): string
  sha3(val: string): string
  soliditySha3(val: string): string
  randomHex(bytes: number): string
  stringToHex(val: string): string
  toAscii(hex: string): string
  toBN(any): BigNumber
  toChecksumAddress(val: string): string
  toDecimal(val: any): number
  toHex(val: any): string
  toUtf8(val: any): string
  toWei(val: string | number | BigNumber, unit: Unit): string | BigNumber
  unitMap: any
}
interface Contract { }
interface Request { }
interface Providers {
  WebsocketProvider: new (host: string, timeout?: number) => WebsocketProvider
  HttpProvider: new (host: string, timeout?: number) => HttpProvider
  IpcProvider: new (path: string) => IpcProvider
}

declare class Eth {
  defaultAccount: string
  defaultBlock: "latest" | "pending" | "genesis" | number
  BatchRequest: new () => BatchRequest
  Iban: new (address: string) => Iban
  Contract: new (jsonInterface: any[], address?: string, options?: {
    from?: string
    gas?: string | number | BigNumber
    gasPrice?: number
    data?: string
  }) => Contract
  abi: {
    decodeLog(inputs: object, hexString: string, topics: string[]): object
    encodeParameter(type: string, parameter: any): string
    encodeParameters(types: string[], paramaters: any[]): string
    encodeEventSignature(name: string | object): string
    encodeFunctionCall(jsonInterface: object, parameters: any[]): string
    encodeFunctionSignature(name: string | object): string
    decodeParameter(type: string, hex: string): any
    decodeParameters(types: string[], hex: string): any
  }
  accounts: {
    new (entropy?: string): Account
    privateToAccount(privKey: string): Account
    publicToAddress(key: string): string
    signTransaction(tx: Tx, privateKey: string, returnSignature?: boolean, cb?: (err: Error, result: string | Signature) => void): Promise<string> | Signature
    recoverTransaction(signature: string | Signature): string
    sign(data: string, privateKey: string, returnSignature?: boolean): string | Signature
    recover(signature: string | Signature): string
    encrypt(privateKey: string, password: string): PrivateKey
    decrypt(privateKey: PrivateKey, password: string): string
    wallet: {
      new (numberOfAccounts: number, entropy: string): Account[]
      add(account: string | Account): any
      remove(account: string | number): any
      save(): void
      load(): void
      clear()
    }
  }
}
declare class Net { }
declare class Personal { }
declare class Shh { }
declare class Bzz { }
declare class BatchRequest {
  constructor()
  add(request: Request): void //
  execute(): void
}
declare class Web3 {
  static providers: Providers
  static givenProvider: Provider
  static modules: {
    Eth: new (provider: Provider) => Eth
    Net: new (provider: Provider) => Net
    Personal: new (provider: Provider) => Personal
    Shh: new (provider: Provider) => Shh
    Bzz: new (provider: Provider) => Bzz
  }
  constructor(provider: Provider)
  version: string
  BatchRequest: new () => BatchRequest
  extend(methods: any): any // TODO
  bzz: Bzz
  currentProvider: Provider
  eth: Eth
  ssh: Shh
  givenProvider: Provider
  providers: Providers
  setProvider(provider: Provider): void
  utils: Utils
}


export default Web3