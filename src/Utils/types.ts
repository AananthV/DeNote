/*
* Taken from: https://stackoverflow.com/a/52127625
* Helper function to check if the given (optional) fields are present
* in the object.
* usage: checkFields(object, 'field1', 'field2'...)
*/
type MakeRequired<T,K extends keyof T> = Pick<T, Exclude<keyof T, K>> & {[P in K]-?:Exclude<T[P],undefined> }
export function checkFields<T, K extends keyof T>(o: T | MakeRequired<T,K>, ...fields: K[]) : o is MakeRequired<T,K>{
    return fields.every(f => !!o[f]);
}