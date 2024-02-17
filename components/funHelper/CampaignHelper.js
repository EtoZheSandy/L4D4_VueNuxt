const campaigns = [
  {
    id: 'c1',
    name: 'Вымерший центр',
    chapters: [
      { id: 'c1m1_hotel', name: 'Отель' },
      { id: 'c1m2_streets', name: 'Улицы' },
      { id: 'c1m3_mall', name: 'Торговый Центр' },
      { id: 'c1m4_atrium', name: 'Атриум' },
    ],
  },
  {
    id: 'c2',
    name: 'Мрачный карнавал',
    chapters: [
      { id: 'c2m1_highway', name: 'Автострада' },
      { id: 'c2m2_fairgrounds', name: 'Базарная Площадь' },
      { id: 'c2m3_coaster', name: 'Американские Горки' },
      { id: 'c2m4_barns', name: 'Сараи' },
      { id: 'c2m5_concert', name: 'Концерт' },
    ],
  },
  {
    id: 'c3',
    name: 'Болотная лихорадка',
    chapters: [
      { id: 'c3m1_plankcountry', name: 'Дощатые Задворки' },
      { id: 'c3m2_swamp', name: 'Болото' },
      { id: 'c3m3_shantytown', name: 'Трущобы' },
      { id: 'c3m4_plantation', name: 'Плантация' },
    ],
  },
  {
    id: 'c4',
    name: 'Ужасный ливень',
    chapters: [
      { id: 'c4m1_milltown_a', name: 'Городишко при Заводе' },
      { id: 'c4m2_sugarmill_a', name: 'Сахарный Завод' },
      { id: 'c4m3_sugarmill_b', name: 'Бегство с Завода' },
      { id: 'c4m4_milltown_b', name: 'Возвращение в Город' },
      { id: 'c4m5_milltown_escape', name: 'Бегство из Города' },
    ],
  },
  {
    id: 'c5',
    name: 'Приход',
    chapters: [
      { id: 'c5m1_waterfront', name: 'Берег' },
      { id: 'c5m2_park', name: 'Парк' },
      { id: 'c5m3_cemetery', name: 'Кладбище' },
      { id: 'c5m4_quarter', name: 'Квартал' },
      { id: 'c5m5_bridge', name: 'Мост' },
    ],
  },
  {
    id: 'c6',
    name: 'Переход',
    chapters: [
      { id: 'c6m1_riverbank', name: 'Берег Реки' },
      { id: 'c6m2_bedlam', name: 'Подземелье' },
      { id: 'c6m3_port', name: 'Порт' },
    ],
  },
  {
    id: 'c7',
    name: 'Жертва',
    chapters: [
      { id: 'c7m1_docks', name: 'Доки' },
      { id: 'c7m2_barge', name: 'Баржа' },
      { id: 'c7m3_port', name: 'Порт' },
    ],
  },
  {
    id: 'c8',
    name: 'Нет милосердию',
    chapters: [
      { id: 'c8m1_apartment', name: 'Апартаменты' },
      { id: 'c8m2_subway', name: 'Метро' },
      { id: 'c8m3_sewers', name: 'Канализация' },
      { id: 'c8m4_interior', name: 'Госпиталь' },
      { id: 'c8m5_rooftop', name: 'Крыша' },
    ],
  },
  {
    id: 'c9',
    name: 'Роковой полёт',
    chapters: [
      { id: 'c9m1_alleys', name: 'Переулки' },
      { id: 'c9m2_lots', name: 'Гараж' },
    ],
  },
  {
    id: 'c10',
    name: 'Похоронный звон',
    chapters: [
      { id: 'c10m1_caves', name: 'Ограждение' },
      { id: 'c10m2_drainage', name: 'Водосток' },
      { id: 'c10m3_ranchhouse', name: 'Церковь' },
      { id: 'c10m4_mainstreet', name: 'Город' },
      { id: 'c10m5_houseboat', name: 'Лодочная станция' },
    ],
  },
  {
    id: 'c11',
    name: 'Смерть в воздухе',
    chapters: [
      { id: 'c11m1_greenhouse', name: 'Теплица' },
      { id: 'c11m2_offices', name: 'Кран' },
      { id: 'c11m3_garage', name: 'Стройка' },
      { id: 'c11m4_terminal', name: 'Терминал' },
      { id: 'c11m5_runway', name: 'Взлётная полоса' },
    ],
  },
  {
    id: 'c12',
    name: 'Кровавая жатва',
    chapters: [
      { id: 'C12m1_hilltop', name: 'Леса' },
      { id: 'C12m2_traintunnel', name: 'Тоннель' },
      { id: 'C12m3_bridge', name: 'Мост' },
      { id: 'C12m4_barn', name: 'Ж/Д Станция' },
      { id: 'C12m5_cornfield', name: 'Ферма' },
    ],
  },
  {
    id: 'C12',
    name: 'Кровавая жатва',
    chapters: [
      { id: 'C12m1_hilltop', name: 'Леса' },
      { id: 'C12m2_traintunnel', name: 'Тоннель' },
      { id: 'C12m3_bridge', name: 'Мост' },
      { id: 'C12m4_barn', name: 'Ж/Д Станция' },
      { id: 'C12m5_cornfield', name: 'Ферма' },
    ],
  },
  {
    id: 'c13',
    name: 'Холодный ручей',
    chapters: [
      { id: 'c13m1_alpinecreek', name: 'Альпийский Ручей' },
      { id: 'c13m2_southpinestream', name: 'Южный Хвойный Ручей' },
      { id: 'c13m3_memorialbridge', name: 'Памятный Мост' },
      { id: 'c13m4_cutthroatcreek', name: 'Узкий Пролив' },
    ],
  },
  {
    id: 'ColdFront',
    name: 'Cold Front',
    chapters: [
      { id: 'cf_m1_town', name: 'The Town' },
      { id: 'cf_m2_mall', name: 'The Mall' },
      { id: 'cf_m3_evac', name: 'The Evacuation' },
      { id: 'cf_m4_outskirts', name: 'The Outskirts' },
      { id: 'cf_m5_highway', name: 'Highway Finale' },
    ],
  },

];


// Было бы неплохо перенести их на API и сделать таблицу: map_id | map_name | campaign_name
export function findChapterById(chapterId) {
    let campaignName = null;
    let chapterName = null;

    for (const campaign of campaigns) {
        const chapter = campaign.chapters.find((ch) => ch.id === chapterId);
        if (chapter) {
            campaignName = campaign.name;
            chapterName = chapter.name;
            break;
        }
    }

    if (campaignName === null && chapterName === null) {
        return {
            campaignName: 'Неизвестно',
            chapterName: 'Неизвестно',
        };
    }

    return {
        campaignName: campaignName,
        chapterName: chapterName,
    };
}



