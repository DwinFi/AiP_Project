// testMongoose.js
const mongoose = require('mongoose');
const Aircraft = require('./models/Aircraft');

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/aviationDB');
    console.log('✔ Connected to MongoDB (aviationDB)');

    await Aircraft.deleteMany({});

    const planes = [
      {
        name: 'БИ-1',
        nick: 'bi',
        image: '/images/bi.png',
        description: 'Первый советский ракетный истребитель, экспериментальный самолёт для борьбы с бомбардировщиками.',
        flightSpecs: {
          maxSpeed_atAlt: '799 км/ч на высоте 2000 м',
          climbRate: '100 м/с',
          turnTime: '23 с',
          maxAltitude: '12 000 м',
          takeoffRun: '300 м'
        },
        technical: {
          crew: '1 человек',
          engine: 'Исаев Д-1а',
          length: '6.4 м',
          wingspan: '6.5 м',
          wingLoading: '233 кг/м²',
          baseMass: '0.92 т',
          fuelInMainTanks: '0.71 т (≈1 м)',
          limits: 'Предельная скорость 920 км/ч, М=0.81, Перегрузка -3/9 G'
        },
        armament: {
          guns: '2 × 20-мм пушка ШВАК',
          ammo: '90 снарядов',
          rateOfFire: '800 выст./мин.',
          maxPayload: ''
        }
      },
      {
        name: 'Horten Ho 229',
        nick: 'ho229',
        image: '/images/ho229.png',
        description: 'Немецкий экспериментальный самолёт — реактивное летающее крыло с низкой заметностью.',
        flightSpecs: {
          maxSpeed_atAlt: '910 км/ч (8000 м)',
          climbRate: '21 м/с',
          turnTime: '24 с',
          maxAltitude: '12 000 м',
          takeoffRun: '850 м'
        },
        technical: {
          crew: '1 человек',
          engine: '2 × Junkers Jumo 004D',
          length: '7.5 м',
          wingspan: '16.8 м',
          wingLoading: '190 кг/м²',
          baseMass: '4.92 т',
          fuelInMainTanks: '2.4 т',
          limits: 'Предельная скорость 980 км/ч, M=0.92, Перегрузка -5/10 G'
        },
        armament: {
          guns: '2 × 30-мм MK 103',
          ammo: '340 снарядов',
          rateOfFire: '450 выст./мин.',
          maxPayload: ''
        }
      },
      {
        name: 'F-117 Nighthawk',
        nick: 'f117',
        image: '/images/f117.png',
        description: 'Первый серийный самолёт-«стелс» США.',
        flightSpecs: {
          maxSpeed_atAlt: '1050 км/ч',
          climbRate: '34 м/с',
          turnTime: '40 с',
          maxAltitude: '10 500 м',
          takeoffRun: '1100 м'
        },
        technical: {
          crew: '1 человек',
          engine: '2 × GE F404-F1D2',
          length: '19.4 м',
          wingspan: '13.2 м',
          wingLoading: '288 кг/м²',
          baseMass: '13.38 т',
          fuelInMainTanks: '8.26 т',
          limits: 'Предельный Мах 0.96, Перегрузка -3/6 G'
        },
        armament: {
          guns: '',
          ammo: '',
          rateOfFire: '',
          maxPayload: '8165 кг'
        }
      }
    ];

    const inserted = await Aircraft.insertMany(planes);

    console.log(`✔ Inserted documents: ${inserted.length}`);
    console.log('✔ Collection content:', await Aircraft.find().select('name nick'));
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log('done');
  }
}

main();
