const nedb = require('gray-nedb');

// Creates data class model
class Pantry {
    // Dictates whether persistent data or nnot
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath)
        } else {
            this.db = new nedb();
        }
    }
    
    // Adds some sample data
    init() {
        this.db.insert({
            name: 'Carrots',
            quantity: 3,
            expiry: '04/22/2024',
            owner: 'Largs Academy',
            description: 'Fresh carrots hand picked by pupils at Largs Academy'
        });
        console.log('db entry Carrot inserted.');

        this.db.insert({
            name: 'Tomatoes',
            quantity: 100,
            expiry: '07/24/2024',
            owner: 'North Ayrshire Council',
            description: 'Fresh tomatoes hand picked at school gardens in north ayrshire.'
        })
        console.log('db entry Tomato inserted.')
    }
    // Method to return all entries in db
    getAllEntries() {
        return new Promise((resolve, reject) => {
            // TODO: ensure only in date items displayed
            this.db.find({}, function(err, entries){
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }

    addEntry(name, quantity, expiry, owner, description) {
        var entry = {
            name: name,
            quantity: quantity,
            expiry: expiry,
            owner: owner,
            description: description
        }
        console.log('Entry created', entry);
        this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document', name)
            } else {
                console.log('Document inserted into db', doc);
            }
        })
    }
}

module.exports = Pantry;