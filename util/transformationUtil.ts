export const convertStringToBoolean = (string: any) =>{
    return string === 'true' ? true : string === 'false' ? false : undefined
}