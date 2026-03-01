const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");

// --- 1. CONFIGURACIÓN DE LOGOS ---
// Asegúrate de que los nombres coincidan exactamente con tu canales.php
const LOGOS = {
    "Net": "https://extracity.click/img/Nettv.png",
    "Telefe Noticias": "https://extracity.click/img/telefenoticias.jpg",
    "Cadena Elite":"https://extracity.click/img/cadenaelite.png",
"Aire":"https://extracity.click/img/aire.png",
"C5N":"https://extracity.click/img/c5n.png",
"Telesol":"https://extracity.click/img/telesol.jpg",
"Telefe/ 7 Jujuy":"https://extracity.click/img/7jujuy.jpg",
"Quaere":"https://extracity.click/img/rquaere.png",
"America / Siete Mendoza":"https://extracity.click/img/sietemendoza.png",
"Radio 10":"https://extracity.click/img/radio10.jpg",
"El once":"https://extracity.click/img/elonce.jpg",
"AR 12":"https://extracity.click/img/ar12tv.jpg",
"Artear/ Resistencia":"https://extracity.click/img/eltrece.png",
"T13":"https://extracity.click/img/t13tv.jpg",
"Bravo":"https://extracity.click/img/bravotv.jpg",
"Multivisión":"https://extracity.click/img/multivision.png",
"Unife":"https://extracity.click/img/unife.png",
"Telemax":"https://extracity.click/img/telemax.png",
"Canal E":"https://extracity.click/img/canal-e.png",
"Urbana":"https://extracity.click/img/urbanatv.png",
"Canal 21 TV":"https://extracity.click/img/canal21tv.png",
"TN":"https://extracity.click/img/tnlogo.png",
"Cronica":"https://extracity.click/img/cronica.jpg",
"A24":"https://extracity.click/img/am24.png",
"La Nación":"https://extracity.click/img/lnmas.jpg",
"Canal 26":"https://extracity.click/img/26canal.jpg",
"Canal de la Ciudad":"https://extracity.click/img/ciudadcanal.jpg",
"San Luis +":"https://extracity.click/img/sanluismas.png",
"Vive":"https://extracity.click/img/vivetv.jpg",
"France 24":"https://extracity.click/img/france24.jpg",
"TVE News":"https://unktv.digital/img/tvenews.jpg",
"TVE":"https://unktv.digital/img/tveint.jpg",
"Run Films":"https://extracity.click/img/runtime.png",
"Blu":"https://extracity.click/img/bluemedios.jfif",
"Five":"https://extracity.click/img/fivetv.png",
"Neo":"https://extracity.click/img/neotv.png",
"Run Acción":"https://extracity.click/img/runtime.png",
"Gen":"https://extracity.click/img/gentv.png",
"Bayres":"https://extracity.click/img/bayres.jfif",
"Cine Romántico":"https://extracity.click/img/cineromanticotv.png",
"Retro Plus 3":"https://unktv.digital/img/retroplus.jpg",
"Free Actión":"https://extracity.click/img/freeTV.png",
"GRB TV":"https://extracity.click/img/garabito.webp",
"Cinerama":"https://extracity.click/img/cinerama.jpg",
"Bombi Tv":"https://extracity.click/img/bombitv2.png",
"Canal del Sol":"https://extracity.click/img/canaldelsol.png",
"Aurora Films":"https://extracity.click/img/auroramedia.jfif",
"Metro Cine":"https://extracity.click/img/metro12.jpg",
"Multivision":"https://extracity.click/img/multivisionplay.png",
"Megacine Tv":"https://extracity.click/img/megacine.png",
"Satel":"https://extracity.click/img/satel.jfif",
"Wow Movies":"https://extracity.click/img/wowmovies.jpg",
"Autentica":"https://extracity.click/img/autenticape.png",
"Latina TV":"https://unktv.digital/img/latinape.png",
"Señal Perú":"https://extracity.click/img/senalpe.jfif",
"Chile Channel":"https://extracity.click/img/chilechannel.png",
"Canal 19 EL Salvador":"https://extracity.click/img/canal19.jfif",
"Mexiquense tv":"https://extracity.click/img/mexiquense.jpeg",
"RT":"https://extracity.click/img/rtamerica.png",
"Brics":"https://extracity.click/img/brics.jpg",
"El Garage":"https://extracity.click/img/garagetv.png",
"Powernation":"https://extracity.click/img/powernation.png",
"TDP":"https://extracity.click/img/tdp.jpeg",
"Telecolor":"https://extracity.click/img/telecolor.jpeg",
"CGTN":"https://extracity.click/img/cgtn.jpeg",
"Educa tv":"https://extracity.click/img/educatv.jpg",
"Nexxo":"https://extracity.click/img/nexxo.jpeg",
"TVA Italia":"https://extracity.click/img/tvaitalia.png",
"RTL":"https://extracity.click/img/rtl.png",
"Activa":"https://extracity.click/img/activa.jpg",
"Quiero Música":"https://extracity.click/img/quiero.jpeg",
"Rockola TV":"https://extracity.click/img/rockola.jpeg",
"El Folklorico":"https://extracity.click/img/elfolklorico.jpeg",
"Chamame":"https://extracity.click/img/chamametv.jpeg",
"Tierra Mia":"https://extracity.click/img/tierramia.jpg",
"Music Top":"https://extracity.click/img/musictop.jpeg",
"Pop World":"https://extracity.click/img/popw.jpeg",
"BTA"."https://extracity.click/img/bta.png",
"Dance Main Stage":"https://extracity.click/img/dancetv.jpeg",
"Quantica":"https://extracity.click/img/quantica.png",
"V classic":"https://extracity.click/img/vclassic.png",
"Vclassic Tropical":"https://extracity.click/img/vclassictr.png",
"Vivo":"https://extracity.click/img/vivouruguay.jpg",
"Sol Música":"https://extracity.click/img/solmusica.jpeg",
"Meganets":"https://extracity.click/img/meganet.png",
"Patagonia":"https://extracity.click/img/patagonia.jpeg",
"TvP Pampeana":"https://extracity.click/img/tvpampa.png",
"TDC":"https://extracity.click/img/tdc.png",
"Suspenso Channel":"https://extracity.click/img/suspensochannel.png",
"C21 MX":"https://extracity.click/img/c21.jpeg",
"Telemadrid":"https://extracity.click/img/telemadrid.jpg",
"Canal Sur":"https://extracity.click/img/canalsur.png",
"Megasport":"https://extracity.click/img/megasport.jpeg",
"Argentinisima":"https://extracity.click/img/argentinisima.png",
"Canal 6 Entre Rios":"https://extracity.click/img/6er.jpeg",
"Romance Channel":"https://extracity.click/img/romance.png",
"Canal 3 Formosa":"https://extracity.click/img/3for.png",
"Canal 4 Nogoya":"https://extracity.click/img/4nogoya.jpeg",
"Canal 6 Digital":"https://extracity.click/img/6Digital.png",
"Canal 8":"https://extracity.click/img/8mza.jpeg",
"Once Digital":"https://extracity.click/img/11tvd.jpeg",
"El Doce":"https://extracity.click/img/eldocecba.png",
"Canal 13 La Rioja":"https://extracity.click/img/13rioja.webp",
"Bragado Tv":"https://extracity.click/img/bragadotv.png",
"Televida":"https://extracity.click/img/televida.png",
"Retro Plus":"https://unktv.digital/img/retroplus.jpg",
"Retro Plus 2":"https://unktv.digital/img/retroplus.jpg",
"Cumbia Pop":"https://extracity.click/img/cumbiapop.jpeg",
"Global tv":"https://extracity.click/img/global.png",
"Max anime":"https://extracity.click/img/maxanime.png",
"Radio Gualeguay":"https://extracity.click/img/lt38.png",
"Beats Radio":"https://extracity.click/img/beats.png",
"Radio Tres Arroyo-LU24":"https://extracity.click/img/lu24.png",
"Latina Radio":"https://extracity.click/img/latinaradio.jpg",
"Radio la Red":"https://extracity.click/img/lared.jpeg",
"Telesur":"https://extracity.click/img/telesur.jpeg",
"Canal Malaga":"https://extracity.click/img/malaga.jpeg",
" Tv Pública / Balcarce 2":"https://extracity.click/img/tv2.jpeg",
"BA 360":"https://unktv.digital/img/ba360.png",
"GENERAL": "https://1122.click/img/1122click.png"
};
// --- 2. DEFINICIÓN DEL MANIFIESTO ---
const builder = new addonBuilder({
    id: "com.1122click.addon",
    version: "1.0.0",
    name: "1122 Click TV",
    description: "Canales en vivo de 1122.click",
    resources: ["catalog", "meta", "stream"],
    types: ["tv"],
    catalogs: [
        {
            type: "tv",
            id: "1122_catalog",
            name: "1122 Click"
        }
    ],
    idPrefixes: ["1122_"]
});

// --- 3. FUNCIÓN PARA OBTENER LOS CANALES ---
async function fetchChannels() {
    try {
        const response = await axios.get("https://1122.click/play/canales.php");
        const lines = response.data.split("\n");
        return lines
            .filter(line => line.includes(","))
            .map((line, index) => {
                const parts = line.split(",");
                const name = parts[0].trim();
                const url = parts[1].trim();
                return { 
                    id: `1122_${index}`, 
                    name, 
                    url,
                    logo: LOGOS[name] || LOGOS["GENERAL"]
                };
            });
    } catch (e) {
        console.error("Error al obtener canales:", e);
        return [];
    }
}

// --- 4. CONFIGURACIÓN DE LOS MANEJADORES (HANDLERS) ---

builder.defineCatalogHandler(async () => {
    const channels = await fetchChannels();
    return {
        metas: channels.map(ch => ({
            id: ch.id,
            type: "tv",
            name: ch.name,
            poster: ch.logo,
            posterShape: "landscape"
        }))
    };
});

builder.defineMetaHandler(async (args) => {
    const channels = await fetchChannels();
    const ch = channels.find(c => c.id === args.id);
    return {
        meta: {
            id: args.id,
            type: "tv",
            name: ch ? ch.name : "Canal",
            logo: ch ? ch.logo : "",
            background: ch ? ch.logo : "",
            description: "Transmisión en vivo desde 1122.click"
        }
    };
});

builder.defineStreamHandler(async (args) => {
    const channels = await fetchChannels();
    const ch = channels.find(c => c.id === args.id);
    
    if (!ch) return { streams: [] };

    // Soporte para YouTube
    if (ch.url.includes("youtube.com") || ch.url.includes("youtu.be")) {
        const ytId = ch.url.split("v=")[1] || ch.url.split("/").pop();
        return { streams: [{ ytId }] };
    }

    // Soporte para links directos (m3u8, mp4, etc)
    return { 
        streams: [
            { title: "Reproducir en Vivo", url: ch.url }
        ] 
    };
});

// --- 5. ARRANCAR EL SERVIDOR ---
// Esta línea es clave para que Render funcione correctamente
const port = process.env.PORT || 7000;
serveHTTP(builder.getInterface(), { port: port });

console.log(`Addon activo en el puerto ${port}`);
