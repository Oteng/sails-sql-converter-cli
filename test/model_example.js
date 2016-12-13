//User Model ( User.js )
module.exports = {
    attributes: {
        // user_id: 'string', //id based on primary key constraint
        username: 'string',
        password: 'string',
        type: 'boolean',

        //this is a ref for query system
        empl: {
            collection: 'empl',
            via: 'user'
        }
    }
};


//Empl Model ( Empl.js )
module.exports = {
    attributes:{
        //user id will be in the empl table
        user: {
            model: "user"
        }
    }
};