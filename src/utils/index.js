require('dotenv').config();
const jwt = require('jsonwebtoken');

function getRealLink(idServer, link) {
    switch (parseInt(idServer)) {
        case 4:
            return `https://playhydrax.com/?v=${link}`;
        case 6:
            return `https://short.ink/${link}`;
        case 10:
            return `https://www.youtube.com/embed/${link}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&autoplay=0`;
        case 12:
            return `https://www.dailymotion.com/embed/video/${link}?queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false`;
        case 13:
            return link;
        case 15:
            return `https://zembed.net/v/${link}.html`;
        case 23:
            return `https://ssplay.net/v/${link}.html`;

        default: return 'Not found !!!!'
    }
}


module.exports = {
    signAccessToken: async (user) => {
        return new Promise((resolve, rejects) => {
            const payload = user;

            const secret = process.env.ACCESS_TOKEN_SECRET;

            const option = {
                expiresIn: '3h'
            }

            jwt.sign(payload, secret, option, (err, token) => {
                if (err) rejects(err);
                resolve(token);
            })
        });
    },
    signRefreshToken: async (user) => {
        return new Promise((resolve, rejects) => {
            const payload = user;

            const secret = process.env.REFRESH_TOKEN_SECRET;

            const option = {
                expiresIn: '7h'
            }

            jwt.sign(payload, secret, option, (err, token) => {
                if (err) rejects(err);
                resolve(token);
            })
        });
    },
    getRealLink,
    convertMulti: (multi, idMovie) => {
        const arrEps = multi.split('\n');
        const newArrEps = arrEps.map(ep => {
            return { episode: ep.split('|')[0], hls: ep.split('|')[1], movie_id: idMovie };
        });
        return newArrEps;
    }
}