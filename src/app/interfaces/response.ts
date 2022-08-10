export interface Countries{
   countries:Country[]
}


export interface  Country{
    country_name?: string,
    country_short_name?: string,
    country_phone_code?: number
}

export interface States{
    states:State[]
}
export interface State{
    state_name:string
}

