const playlists = [
  [
    {
      trackId: "trk101",
      artist: "Velvet Comet",
      title: "Crimson Afterglow",
      votes: 5,
      bpm: 122
    },
    {
      trackId: "trk102",
      artist: "Neon Harbor",
      title: "Static Horizon",
      votes: 2,
      bpm: 108
    },
    {
      trackId: "trk103",
      artist: "Lunar Arcade",
      title: "Midnight Frequency",
      votes: 4,
      bpm: 128
    }
  ],

  [
    {
      trackId: "trk201",
      artist: "Solar Echo",
      title: "Glass Skyline",
      votes: 3,
      bpm: 115
    },
    {
      trackId: "trk202",
      artist: "Velvet Comet",
      title: "Satellite Hearts",
      votes: 6,
      bpm: 124
    }
  ]
];

function flattenPlaylists(arr){
  let lists = arr;
  let resArr = [];
  if(!Array.isArray(lists)){
    return [];
  }
  lists.forEach((list,i)=>{
    list.forEach((l,j)=>{
      l["source"] = [i,j];
      resArr.push(l);
    });
  });
  return resArr;
}
////text
// console.log(flattenPlaylists(playlists));


let returnArr = flattenPlaylists(playlists);
function scoreTracks(arr){
  arr.map(song=>song["score"] = song.votes * 10 - Math.abs(song.bpm - 120));
  return arr;
}
////text
// console.log(scoreTracks(returnArr));


let returnScoreTracks = scoreTracks(returnArr);
function dedupeTracks(arr){//去除重复trackId
  let list = arr;
  const myMap = new Map();
  return list.filter(song=>{
    const trackId = song.trackId.trim();
    const value = myMap.get(trackId) ?? 0;
    if(value < 1){
      myMap.set(trackId,value+1);//set(a,b);
      return true;
    }
    return false;
  });
}
////text
// console.log(dedupeTracks(returnScoreTracks));


let returnDedupeTracks = dedupeTracks(returnScoreTracks);
function enforceArtistQuota(arr,repeatingNum){//去除重复artist
  let list = arr;
  const myMap = new Map();
  return list.filter(song=>{//filter返回新数组
    const artist = song.artist.trim();
    const value = myMap.get(artist) ?? 0;
    if(value < repeatingNum){//1.value为空那么它=0,反正我们要做的是还没存,设置为1 //2.存了拿出来,符合条件返回value+1
      myMap.set(artist,value+1);//set(a,b);
      return true;
    }
    return false;
  });
}
////text
// console.log(enforceArtistQuota(returnScoreTracks,1));


let returnEnforceArtistQuota = enforceArtistQuota(returnScoreTracks,1);
function buildSchedule(arr){
  let resArr = [];
  arr.forEach((song,i)=>resArr.push({slot:i+1,trackId:song.trackId}));
  return resArr;
}
////text
// console.log(buildSchedule(returnEnforceArtistQuota));


function remixPlaylist(arr,num){
  let arr1 = flattenPlaylists(arr);
  let arr2 = scoreTracks(arr1);
  let arr3 = dedupeTracks(arr2);
  let arr4 = enforceArtistQuota(arr3,num);
  let arr5 = buildSchedule(arr4);
  return arr5;
}
console.log(remixPlaylist(playlists,1));
