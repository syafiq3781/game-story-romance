import React, { useState, useEffect } from 'react';
import { Heart, User, MessageCircle, Trophy, Volume2, VolumeX } from 'lucide-react';

const DatingSimGame = () => {
  const [gameState, setGameState] = useState('start');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [relationshipPoints, setRelationshipPoints] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ending, setEnding] = useState(null);

  const characters = [
    {
      id: 'osis',
      name: 'Rina Sakura',
      type: 'Anak OSIS',
      desc: 'Ketua OSIS yang perfectionist dan tegas',
      color: '#FF69B4',
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      location: ' Lorong Kelas',
      personality: 'Disiplin, tegas, tapi punya sisi lembut',
      hobby: 'Mengatur acara sekolah',
      img: 'https://files.catbox.moe/rsbs2d.png'

    },
    {
      id: 'kutu_buku',
      name: 'Yuki Haruno',
      type: 'Kutu Buku',
      desc: 'Pintar dan suka membaca di perpustakaan',
      color: '#87CEEB',
      bg: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      location: ' Perpustakaan',
      personality: 'Pemalu, cerdas, dan penuh pengetahuan',
      hobby: 'Membaca novel dan belajar',
      img : 'https://files.catbox.moe/ptzbp8.png'
    },
    {
      id: 'wibu',
      name: 'Miku Tanaka',
      type: 'Wibu',
      desc: 'Otaku sejati yang suka anime dan manga',
      color: '#FFB6C1',
      bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      location: ' Ruang Klub Anime',
      personality: 'Ceria, energik, dan passionate',
      hobby: 'Nonton anime dan cosplay',
      img : 'https://files.catbox.moe/ienaqo.png'
    },
    {
      id: 'badgirl',
      name: 'Rei Kurosaki',
      type: 'Bad Girl',
      desc: 'Pemberontak yang sebenarnya baik hati',
      color: '#696969',
      bg: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
      location: ' Lapangan Belakang',
      personality: 'Cuek, misterius, tapi protektif',
      hobby: 'Main basket dan motor',
      img : 'https://files.catbox.moe/mc5zo4.png'

    },
    {
      id: 'pendiam',
      name: 'Aoi Mizuki',
      type: 'Pendiam',
      desc: 'Gadis misterius yang jarang bicara',
      color: '#9370DB',
      bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      location: ' Taman Sekolah',
      personality: 'Tenang, observant, dan artistik',
      hobby: 'Melukis dan mendengarkan musik',
      img : 'https://files.catbox.moe/5x8o4b.png'

    }
  ];

  const storyScenes = {
    osis: [
      {
        text: "Kamu bertemu Rina di lorong kelas. Dia sedang mengecek papan pengumuman dengan serius.",
        dialogue: "Oh, kamu! Apa kamu sudah mengisi formulir untuk acara festival sekolah?",
        choices: [
          { text: "Sudah dong! Aku selalu tertib kok 😊", points: 15 },
          { text: "Belum... maaf ya, aku lupa", points: -5 },
          { text: "Emang kenapa kalau belum? Santai aja kali", points: -15 }
        ]
      },
      {
        text: "Rina tersenyum tipis melihat responmu. Kalian berjalan bersama ke ruang OSIS.",
        dialogue: "Kamu tahu? Aku sebenarnya capek jadi ketua OSIS... tapi aku suka membantu orang.",
        choices: [
          { text: "Kamu pasti bisa! Aku akan bantu kamu", points: 20 },
          { text: "Kalau capek ya istirahat aja", points: 5 },
          { text: "Terus kenapa masih jadi ketua?", points: -10 }
        ]
      },
      {
        text: "Saat persiapan festival, Rina terlihat stress. Ada masalah dengan sponsor.",
        dialogue: "Kenapa sih semua jadi berantakan?! *frustrated*",
        choices: [
          { text: "*peluk* Tenang, kita bisa selesaikan bareng", points: 25 },
          { text: "Aku punya ide! Bagaimana kalau kita...", points: 15 },
          { text: "Ya udah, cancel aja festivalnya", points: -20 }
        ]
      }
    ],
    kutu_buku: [
      {
        text: "Kamu menemukan Yuki sedang membaca novel tebal di perpustakaan yang sepi.",
        dialogue: "Ah! K-kamu... *blush* Duduk sini boleh kok...",
        choices: [
          { text: "Kamu lagi baca apa? Boleh cerita?", points: 15 },
          { text: "*duduk diam sambil baca sendiri*", points: 5 },
          { text: "Wah sepi banget ya disini, ngantuk deh", points: -10 }
        ]
      },
      {
        text: "Yuki mulai terbuka dan bercerita tentang buku favoritnya dengan mata berbinar.",
        dialogue: "A-aku suka buku ini karena... karakternya seperti aku dulu...",
        choices: [
          { text: "Cerita dong masa lalunya! Aku mau dengerin", points: 20 },
          { text: "Oh gitu... *sambil main HP*", points: -15 },
          { text: "Kamu unik kok, nggak perlu berubah", points: 25 }
        ]
      },
      {
        text: "Yuki mengajakmu ke area baca rahasia di lantai atas perpustakaan.",
        dialogue: "T-tempat ini spesial... kamu orang pertama yang aku ajak kesini...",
        choices: [
          { text: "Terima kasih sudah percaya sama aku ❤️", points: 30 },
          { text: "Oke, lumayan buat tempat belajar", points: 10 },
          { text: "Hmm biasa aja sih tempatnya", points: -20 }
        ]
      }
    ],
    wibu: [
      {
        text: "Miku berlari menghampirimu dengan antusias, mata berbinar melihat tas anime-mu.",
        dialogue: "KYAAA! Kamu suka anime itu juga?! Aku kira aku satu-satunya! ✨",
        choices: [
          { text: "Iya dong! Favorite charactermu siapa?", points: 20 },
          { text: "Oh iya, lumayan sih nontonnya", points: 5 },
          { text: "Gak terlalu suka anime sih...", points: -15 }
        ]
      },
      {
        text: "Miku mengajakmu ke ruang klub anime. Dia menunjukkan koleksi figure-nya.",
        dialogue: "Ini hasil nabung setahun! Kamu mau lihat cosplay aku? >w<",
        choices: [
          { text: "PASTI! Kamu pasti keren banget!", points: 25 },
          { text: "Boleh, tapi jangan lama-lama ya", points: 0 },
          { text: "Itu buang-buang duit deh", points: -25 }
        ]
      },
      {
        text: "Ada festival cosplay. Miku nervous karena ini pertama kali tampil di depan umum.",
        dialogue: "A-aku takut... bagaimana kalau orang lain menghakimi...?",
        choices: [
          { text: "Aku akan temani kamu! Kita cosplay bareng!", points: 35 },
          { text: "Santai aja, pede itu penting!", points: 15 },
          { text: "Ya udah gak usah ikut aja kalau takut", points: -20 }
        ]
      }
    ],
    badgirl: [
      {
        text: "Rei sedang sendirian di lapangan belakang, merokok... eh bercanda, lagi main basket.",
        dialogue: "Tch. Ngapain lu kesini? *cold stare*",
        choices: [
          { text: "Cuma pengen liat kamu main aja kok", points: 10 },
          { text: "Eh maaf ganggu ya, aku pergi deh", points: -5 },
          { text: "Sok judes banget sih lu", points: -20 }
        ]
      },
      {
        text: "Rei duduk di sampingmu, ternyata dia mau ngobrol.",
        dialogue: "Lu... beda dari yang lain. Nggak nakutin atau judgmental gitu.",
        choices: [
          { text: "Semua orang punya cerita sendiri kan?", points: 25 },
          { text: "Oh... thanks?", points: 5 },
          { text: "Ya iyalah, gue kan baik orangnya", points: -10 }
        ]
      },
      {
        text: "Ada preman ganggu kamu. Rei langsung datang melindungi, hampir berkelahi.",
        dialogue: "Nggak ada yang boleh ganggu dia! *protective mode*",
        choices: [
          { text: "*pegang tangannya* Udah cukup, aku gak apa-apa", points: 30 },
          { text: "Rei... terima kasih sudah lindungin aku", points: 20 },
          { text: "Ih jangan berantem dong! Malu aku!", points: -15 }
        ]
      }
    ],
    pendiam: [
      {
        text: "Aoi sedang melukis sendirian di taman. Dia melirikmu sebentar lalu kembali fokus.",
        dialogue: "...", 
        choices: [
          { text: "*duduk diam di sampingnya sambil menikmati pemandangan*", points: 20 },
          { text: "Hei! Kamu lagi lukis apa?", points: 5 },
          { text: "Wah sepi banget sih, boring deh", points: -15 }
        ]
      },
      {
        text: "Aoi tiba-tiba bicara dengan suara lembut, menunjukkan lukisannya.",
        dialogue: "...kamu... mau lihat...?",
        choices: [
          { text: "*senyum* Boleh. Pasti bagus", points: 25 },
          { text: "Oh iya deh", points: 5 },
          { text: "Hmm, aku nggak ngerti seni sih", points: -20 }
        ]
      },
      {
        text: "Hujan tiba-tiba turun. Aoi menarik tanganmu berlari mencari berteduh.",
        dialogue: "Kamu... selalu membuat... hatiku hangat... *whisper*",
        choices: [
          { text: "*pegang tangannya erat* Aku juga...", points: 35 },
          { text: "Makasih ya udah ajak aku berlindung", points: 15 },
          { text: "Iya deh, kapan hujannya berhenti nih", points: -25 }
        ]
      }
    ]
  };

const [bgMusic, setBgMusic] = useState(null);

const playSound = (type) => {
  if (!soundEnabled) return;
  const audio = new Audio();
  
  // Gunakan audio dari CDN gratis
  if (type === 'click') {
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
  } else if (type === 'love') {
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3';
  } else if (type === 'bad') {
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2577/2577-preview.mp3';
  }
  
  audio.volume = 0.3;
  audio.play().catch(() => {});
};



// HAPUS useEffect yang pertama, ganti jadi function biasa:
const startBGM = () => {
  if (soundEnabled && !bgMusic) {
    const music = new Audio();
    music.src = 'https://files.catbox.moe/m7g0vj.mp3';
    music.loop = true;
    music.volume = 0.2;
    
    music.play().catch((e) => {
      console.log('BGM error:', e);
    });
    
    setBgMusic(music);
  }
};

// Cleanup saat unmount (INI TETAP PAKAI)
useEffect(() => {
  return () => {
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  };
}, [bgMusic]);

// Pause/Play BGM berdasarkan toggle (INI TETAP PAKAI)
useEffect(() => {
  if (bgMusic) {
    if (soundEnabled) {
      bgMusic.play().catch(() => {});
    } else {
      bgMusic.pause();
    }
  }
}, [soundEnabled, bgMusic]);

  const getEnding = (points, char) => {
    if (points >= 60) {
      return {
        type: 'good',
        title: ' GOOD ENDING - True Love',
        text: `Selamat! ${char.name} jatuh cinta padamu! Kalian resmi menjadi pasangan dan menjalani hari-hari indah bersama di sekolah. Setiap hari penuh dengan kebahagiaan dan cinta sejati! ✨`,
        color: '#FF1493'
      };
    } else if (points >= 30) {
      return {
        type: 'friendzone',
        title: ' FRIENDZONE ENDING',
        text: `${char.name} menganggapmu sebagai teman baik! Kalian tetap dekat tapi hanya sebatas sahabat. Mungkin lain kali kamu bisa lebih berusaha? 💙`,
        color: '#4169E1'
      };
    } else if (points >= 0) {
      return {
        type: 'bad',
        title: ' BAD ENDING',
        text: `${char.name} menjauhimu... Hubungan kalian memburuk dan dia memilih untuk tidak berbicara lagi denganmu. Coba lagi dan pilih jawaban yang lebih baik! 💔`,
        color: '#DC143C'
      };
    } else {
      return {
        type: 'secret',
        title: ' SECRET ENDING - Secret Route',
        text: `WOAH! Kamu membuka secret ending! ${char.name} ternyata adalah... *TWIST ENDING TERUNGKAP* ... dan kalian menjalani petualangan epik yang tak terduga! Easter egg unlocked! 🎭✨`,
        color: '#FFD700'
      };
    }
  };

  const handleChoice = (points) => {
    playSound('click');
    setRelationshipPoints(prev => prev + points);
    
    if (selectedCharacter && currentScene < storyScenes[selectedCharacter.id].length - 1) {
      setCurrentScene(prev => prev + 1);
    } else {
      const char = characters.find(c => c.id === selectedCharacter.id);
      const finalEnding = getEnding(relationshipPoints + points, char);
      setEnding(finalEnding);
      setGameState('ending');
    }
  };

  const resetGame = () => {
    playSound('click');
    setGameState('start');
    setSelectedCharacter(null);
    setRelationshipPoints(0);
    setCurrentScene(0);
    setEnding(null);
  };

  const startGame = () => {
    if (playerName.trim()) {
      playSound('click');
      startBGM(); // <-- TAMBAHIN INI
      setGameState('select');
    }
  };

  const selectCharacter = (char) => {
    playSound('click');
    setSelectedCharacter(char);
    setGameState('story');
  };

  if (gameState === 'start') {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
        <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl">
          <div className="mb-6 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-pink-500 animate-pulse" />
            <h1 className="mb-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
             HighSchool Romance
            </h1>
            <p className="text-gray-600">Dating Sim Game </p>
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              <User className="inline w-5 h-5 mr-2" />
              Nama Kamu:
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Masukkan nama..."
              className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500"
              maxLength={20}
            />
          </div>

          <button
            onClick={startGame}
            disabled={!playerName.trim()}
            className="w-full py-3 text-lg font-bold text-white transition transform bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            MULAI GAME 
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center justify-center w-full py-2 mt-4 font-semibold text-gray-700 transition bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 mr-2" /> : <VolumeX className="w-5 h-5 mr-2" />}
            {soundEnabled ? 'Sound ON' : 'Sound OFF'}
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'select') {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
        <div className="max-w-6xl mx-auto">
          <div className="p-8 mb-6 bg-white shadow-2xl rounded-3xl">
            <h2 className="mb-2 text-3xl font-bold text-center">
              pilih yang ingin kamu pacarin
            </h2>
            <p className="text-center text-gray-600">Halo {playerName}! Siapa yang akan kamu dekati?</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {characters.map(char => (
              <div
                key={char.id}
                onClick={() => selectCharacter(char)}
                className="transition duration-300 transform bg-white shadow-lg cursor-pointer oversecret rounded-2xl hover:scale-105 hover:shadow-2xl"
              >
            <div className="w-full h-64 oversecret rounded-xl">
  <img
    src={char.img}
    alt={char.name}
    className="object-cover object-top w-full h-full"
  />
</div>


                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold" style={{ color: char.color }}>
                      {char.name}
                    </h3>
                    <Heart className="w-5 h-5" style={{ color: char.color }} />
                  </div>
                  <p className="mb-2 text-sm font-semibold text-gray-600">{char.type}</p>
                  <p className="mb-3 text-sm text-gray-700">{char.desc}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <p>📍 {char.location}</p>
                    <p>💭 {char.personality}</p>
                    <p>❤️ {char.hobby}</p>
                  </div>
                  <button className="w-full py-2 mt-4 font-semibold text-white transition rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg">
                    PILIH ✨
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'story') {
    const scene = storyScenes[selectedCharacter.id][currentScene];
    const char = characters.find(c => c.id === selectedCharacter.id);

    return (
      <div className="min-h-screen p-4" style={{ background: char.bg }}>
        <div className="max-w-4xl mx-auto">
          {/* Status Bar */}
          <div className="flex items-center justify-between p-4 mb-4 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center space-x-4">
            <div className="w-32 h-32 oversecret rounded-xl">
  <img 
    src={char.img} 
    alt={char.name} 
    className="object-cover object-top w-full h-full"

  />
</div>


              <div>
                <p className="text-lg font-bold">{char.name}</p>
                <p className="text-sm text-gray-600">{char.location}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-1 space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-lg font-bold">{relationshipPoints}</span>
              </div>
              <div className="text-xs text-gray-600">Scene {currentScene + 1}/3</div>
            </div>
          </div>

          {/* Scene Display */}
          <div className="mb-4 bg-white shadow-2xl oversecret rounded-2xl">
            <div className="p-6 bg-gradient-to-r from-pink-100 to-purple-100">
              <p className="italic text-gray-700">📍 {char.location}</p>
              <p className="mt-2 text-gray-800">{scene.text}</p>
            </div>
          </div>

          {/* Character Dialogue */}
          <div className="p-6 mb-4 bg-white shadow-lg rounded-2xl">
            <div className="flex items-start space-x-4">
              <div className="text-5xl">{char.id === 'osis' ? '👑' : char.id === 'kutu_buku' ? '📖' : char.id === 'wibu' ? '🎌' : char.id === 'badgirl' ? '😎' : '🌸'}</div>
              <div className="flex-1">
                <p className="mb-2 font-bold" style={{ color: char.color }}>{char.name}</p>
                <div className="p-4 bg-gray-100 rounded-xl">
                  <MessageCircle className="inline w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-800">{scene.dialogue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Choices */}
          <div className="space-y-3">
            {scene.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleChoice(choice.points)}
                className="w-full p-4 text-left transition transform bg-white border-2 border-purple-300 shadow-md hover:bg-gray-50 hover:border-purple-500 rounded-xl hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{choice.text}</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    choice.points > 10 ? 'bg-green-200 text-green-800' : 
                    choice.points > 0 ? 'bg-yellow-200 text-yellow-800' : 
                    'bg-red-200 text-red-800'
                  }`}>
                    {choice.points > 0 ? '+' : ''}{choice.points}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'ending') {
    const char = characters.find(c => c.id === selectedCharacter.id);
    
    return (
      <div className="flex items-center justify-center min-h-screen p-6" style={{ background: char.bg }}>
        <div className="w-full max-w-2xl p-8 text-center bg-white shadow-2xl rounded-3xl">
          <Trophy className="w-20 h-20 mx-auto mb-4" style={{ color: ending.color }} />
          
          <h2 className="mb-4 text-4xl font-bold" style={{ color: ending.color }}>
            {ending.title}
          </h2>

          <div className="mb-6 text-6xl">
            {char.id === 'osis' ? '👑' : char.id === 'kutu_buku' ? '📖' : char.id === 'wibu' ? '🎌' : char.id === 'badgirl' ? '😎' : '🌸'}
          </div>

          <div className="p-6 mb-6 bg-gray-100 rounded-xl">
            <p className="text-lg leading-relaxed text-gray-800">{ending.text}</p>
          </div>

          <div className="p-4 mb-6 bg-purple-100 rounded-xl">
            <p className="mb-2 font-bold text-purple-800">FINAL STATS</p>
            <div className="flex items-center justify-center space-x-4">
              <div>
                <p className="text-2xl font-bold" style={{ color: ending.color }}>{relationshipPoints}</p>
                <p className="text-sm text-gray-600">Relationship Points</p>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <p className="text-2xl font-bold">{char.name}</p>
                <p className="text-sm text-gray-600">{char.type}</p>
              </div>
            </div>
          </div>

          <button
            onClick={resetGame}
            className="w-full py-4 text-lg font-bold text-white transition transform bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:shadow-lg hover:scale-105"
          >
           MAIN LAGI
          </button>
        </div>
      </div>
    );
  }
};

export default DatingSimGame;