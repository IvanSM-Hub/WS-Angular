
interface AudioPlayer {
    audioVolue: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolue: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: "Ed Sheeran",
        year: 2015
    }
}

/*
console.log('Song: ', audioPlayer.song)
console.log('Duration: ', audioPlayer.songDuration)
console.log('Author: ', audioPlayer.details.author)
*/

console.log('========== Desestructuración ==========')

const { song:anotherSong , songDuration:duration , details } = audioPlayer;

const { author } = details;

console.log('Song: ', anotherSong);
console.log('Duration: ', duration);
console.log('Author: ', author);

const dbz: string[] = ['Goku' , 'Vegeta' , 'Trunks'];
console.log('Personaje 3: ',dbz[2]);

const [ , , trunks='Not found' ]: string[] = ['Goku' , 'Vegeta' , 'Trunks'];
console.log('Personaje 3: ',trunks);

export {};