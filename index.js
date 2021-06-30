'use strict'

const mongoose = require('mongoose');
const app = require('./app'); 
const port = 4000; 
require('dotenv').config({path: ".env"});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.BBDD,
				{
					useNewUrlParser:true,
					useUnifiedTopology:true,
					useFindAndModify:true,
					useCreateIndex:true
				})
		.then(() => { 
			console.log("Running database...");

			app.listen({port:process.env.port || 4000}, () => {
				console.log("Server running in..." + String(port));
			});

		})
		.catch(err => console.log(err)); 