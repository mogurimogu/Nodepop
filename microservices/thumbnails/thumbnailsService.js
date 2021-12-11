'use strict';

const { Responder } = require('cote');
const responder = new Responder({ name: 'thumbnail service' });

responder.on('thumbnail-image', (req , done) => {

    const { destination, filename } = req;

    const thumbnail = {
        from: `${destination}/${filename}`,
        to: `${destination}/thumbnail/thumb-${filename}`
    }
    done(thumbnail)
})
