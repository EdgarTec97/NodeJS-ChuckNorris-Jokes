'use strict'

const ChallengeModel = require('../models/challenge');
var mongoosePaginate = require('mongoose-pagination');
var Superlooper = require('../helpers/superloop');
const Chuck  = require('chucknorris-io');

const ChallengeController = {
    randomly: async (req,res) => {
        try {
            const client = new Chuck();
            let stored;
            const clientFind = await client.getRandomJoke();
            const find = await ChallengeModel.findOne({id: clientFind.id});
            if(!find){
                const challenge = new ChallengeModel({
                    id: clientFind.id,
                    value: clientFind.value,
                    sourceUrl: clientFind.sourceUrl,
                    iconUrl: clientFind.iconUrl,
                    category: clientFind.category
                });
                const result = await challenge.save();
                stored = result;
            }else{
                stored = clientFind;
            }
            return res.status(200).send({data: stored});
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: 'Error executing function Randomly'});
        };
    },
    byCategory: async (req,res) => {
        const params = req.body;
        try {
            const client = new Chuck();
            let stored;
            const clientFind = await client.getRandomJoke(`${params.category}`);
            const find = await ChallengeModel.findOne({id: clientFind.id});
            if(!find){
                const challenge = new ChallengeModel({
                    id: clientFind.id,
                    value: clientFind.value,
                    sourceUrl: clientFind.sourceUrl,
                    iconUrl: clientFind.iconUrl,
                    category: clientFind.category
                });
                const result = await challenge.save();
                stored = result;
            }else{
                stored = clientFind;
            }
            return res.status(200).send({data: stored});
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: 'Error executing function byCategory'});
        };
    },
    words: async (req,res) => {
        var page = 1;
        if(req.params.page){
            page = req.params.page;
        }

	    var items_per_page = 5;
        const params = req.body;
        if(params.text){
            try {
                const array = [];
                const client = new Chuck();
                const result = await client.search(`${params.text}`);
                for await (const joker of result.items) { 
                    const find = await ChallengeModel.findOne({'id': joker.id});
                    if(!find){
                        const challenge = new ChallengeModel({
                            id: joker.id,
                            value: joker.value,
                            sourceUrl: joker.sourceUrl,
                            iconUrl: joker.iconUrl,
                            category: joker.category
                        });
                        const stored = await challenge.save();
                        array.push(stored);
                    }else{
                        array.push(joker);
                    }
                }
                const superlooper = new Superlooper(array, items_per_page, (page+5));
                superlooper.initialize();
                return res.status(200).send({
                    total_items: array.length,
                    pages: Math.ceil(array.length/items_per_page),
                    page: page,
                    items_per_page: items_per_page,
                    data: superlooper.goTo((page+5))
                })
            } catch (error) {
                console.log(error);
                return res.status(500).send({message: 'Error executing function words'});
            }
        }
    },
    getAll: async (req,res) => {
        var page = 1;
        if(req.params.page){
            page = req.params.page;
        }

	    var items_per_page = 5;
        try {
            const response = await ChallengeModel.find();
            const result = await ChallengeModel.find().paginate(page, items_per_page);
            return res.status(200).send({
				total_items: response.length,
				pages: Math.ceil(response.length/items_per_page),
				page: page,
				items_per_page: items_per_page,
				result
			})
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: 'Error executing function find'});
        }
    }
}

module.exports = ChallengeController;