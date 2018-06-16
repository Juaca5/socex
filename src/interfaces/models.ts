
export interface UserOptions {
  username 	: string,
  password 	: string,
  error 	: string
}

export interface Local {
  name 	: string,
  logo 	: string,
  lat 	: Number,
  lng 	: Number,
  suma 	: Number,
  suma1 : Number,
  puntos: Number 
}

export interface Invitation {
  sended   	: Date,
  expire 	: Date,
  user   	: string,
  recept 	: string,
  state  	: Number,
  message 	: string,
  local 	: string
}

export interface Notification {
  date   	: Date,
  expire 	: Date,
  user   	: string,
  recept 	: string,
  state  	: Number,
  message 	: string,
  local 	: string
  time		: string, 
  viewed	: boolean, 
  isChecked : boolean
}
