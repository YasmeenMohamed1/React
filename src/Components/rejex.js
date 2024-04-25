export const validEmail = new RegExp(
    '^[a-zA-Z0-9]+@[a-zA-Z]+(\\.[a-zA-Z]{2,})+$'

 );



export const validPassword = new RegExp(
    '^(?=.*?[A-Za-z])(?=.*?[@$!%*?&])(?=.*?[0-9]).{8,}$'
    );

export const validUsername = new RegExp(
    '^[a-zA-Z0-9]{3,}$'
    );