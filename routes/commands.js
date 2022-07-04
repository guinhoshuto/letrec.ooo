const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const express = require('express');
const router = express.Router();
const commands = require('../commands')
const fs = require('fs');
require('dotenv').config()

// const commandFiles = fs.readdirSync('../commands/').filter(file => file.endsWith('.js'));

const rest = new REST({ version: '9'}).setToken(process.env.TOKEN);

router.get('/', async function (req, res, next) {
    console.log(commands)
    try {
        console.log('comecou a cadastrar');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands }
        );
        console.log( 'instalou os comandos')
        res.json('cadastado');
    } catch (e) {
        res.status(500).json({'message': 'erro: ' + e});
    }
})

module.exports = router;