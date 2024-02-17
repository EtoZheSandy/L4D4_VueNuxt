<script>
export default {
  setup () {
    useSeoMeta({
      title: 'Правила',
      ogTitle: 'Правила Endurance',
      description: 'Правила проекта Endurance',
      ogDescription: 'Правила проекта Endurance',
      ogImage: 'https://l4d4.com/images/rules.png',
    })
  },
  data() {
    return {
      currentLanguage: 'Русский',
      languageTexts: {
        'Русский': {
          mainText: 'Основные правила',
          subText: 'Если вы не нашли ответ на нужный вопрос, задайте его в нашем',
          rules: [
            {
              title: '●1 Запрещается преднамеренная стрельба по напарникам.',
              description: 'Карается баном при достижение 90 урона',
            },
            {
              title: '●2 В отношении других игроков запрещены: любые виды конфликтов о политических взглядах, разжигание межнациональной розни, унижение, оскорбления с переходом на личности, токсичное поведение.',
              description: 'Даже при отсутствие модераторов на сервере',
            },
            {
              title: '●3 Запрещается наносить вред игровому процессу: использование серьёзных багов, самоубийство, сокращение карты более чем на 10%, намеренное использование определенных мест на карте для обмана искусственного интеллекта ботов, переходить из команды в команду, чтобы откровенно нанести ей ущерб (переход в начале раунда с последующем рашем, использование механики Endgame во вред, нанесение урона по выжившим и т.д.).',
              description: '',
            },
            {
              title: '●4 Запрещается использовать микрофон с наличием постоянных и громких шумов.',
              description: '',
            },
            {
              title: '●5 Запрещается проигрывать сторонние звуковые файлы через голосовой чат.',
              description: '',
            },
            {
              title: '●6 Запрещено распространять (в том числе с помощью спреев) контент, который',
              description: '6.1) содержит угрозы, призывы к насилию, в том числе скрытые, одобрение и поощрение насильственных действий;\n6.2) дискредитирует, оскорбляет, порочит честь и достоинство или репутацию или нарушает неприкосновенность частной жизни других игроков или третьих лиц;\n6.3) является вульгарным или непристойным, содержит порнографические изображения или сцены сексуального характера;\n6.3) содержит сцены бесчеловечного обращения с животными.',
            },
            {
              title: '●7 Запрещено оскорбление администраторов и модераторов в любой форме.',
              description: '',
            },
            {
              title: '●8 Запрещена агрессивная реклама других серверов (Явная реклама в игровом чате или через голосовой чат, а так же в нике).',
              description: '',
            },
            {
              title: '●9 Запрещено использование всех видов читерских программ или читерский контент, замаскированный под аддоны, а также сторонние программы дающие преимущество в том или ином виде (например, автокликеры и макросы)',
              description: '',
            },
            {
              title: '●10 Запрещено обсуждать сервер в грубой форме.',
              description: '',
            },
            {
              title: '●11 Запрещен любой технический вред серверам, ровно как неавторизированный доступ к ресурсам серверов.',
              description: '',
            },
            {
              title: '●12 Запрещено добавление Администрации и Модераторов сервера в черный список Steam, тем самым препятствовать их подключению к серверу.',
              description: '',
            },
            {
              title: '●13 Запрещено обходить баны с помощью других аккаунтов.',
              description: '',
            },
            {
              title: '●14 Запрещено систематическое получение временных банов (до 3 банов на игрока).',
              description: '',
            },
            {
              title: '●15 Любые другие ситуации, неописанные здесь, рассматриваются администрацией отдельно.',
              description: '',
            },
            {
              title: '●16 Администрация и модераторы имеют право самостоятельно решать, на какой срок выдавать бан.',
              description: '',
            },
            {
              title: '●17 Наказание за нарушение может быть пересмотрено администрацией для каждого отдельного случая.',
              description: '',
            },
            {
              title: '●18 Администрация и модераторы имеют право потребовать скриншот у игрока, если имеются сомнения в честной игре данного игрока. Отказ или выход с сервера будут расцениваться как аргумент в пользу бана, однако данный аргумент не может быть основополагающим.',
              description: '',
            },
            {
              title: '●19 Игроки имеют право оспорить бан в личных сообщениях группы ВК или в обсуждении в группе Steam, соблюдая форму.',
              description: '',
            },
            {
              title: '●20 Игроки имеют право подать жалобу на других игроков, если те явно нарушают правила сервера, а у подающего жалобу имеется доказательная база.',
              description: '',
            },
            // Дополнительные правила для Турниров:
            {
              title: 'Дополнительные правила для Турниров:',
              description: '',
            },
            {
              title: '● 1 Запрещены такие баги как: телепорт танков и любых зараженных, блокирование проходов объектами, использование "слепых зон".',
              description: 'Матч будет приостановлен, последствия устранены, а Ваша команда получит штраф 150 очков.',
            },
            {
              title: '● 2 Запрещен ничем не обоснованный переход из одной команды в другую.',
              description: 'Администратор-наблюдатель перекинет вас обратно и выдаст предупреждение, за повторное нарушение -100 очков.',
            },
            {
              title: '● 3 Запрещён раш в самом начале раунда, если не все игроки загрузились и не выбрали перки.',
              description: 'Штраф 150 очков. Раунд будет переигран.',
            },
            {
              title: '● 4 Игрокам запрещено покидать турнир во время игры без уважительной причины.',
              description: 'Дисквалификация с данного турнира, обнуление всех заслуг в данном турнире, наказание в виде недопуска до других турниров в зависимости от причиненного вреда на усмотрение администратора-наблюдателя, стоящего за проведением турнира.',
            },
            {
              title: '● 5 Запрещено использование привилегий, пока идёт турнир.',
              description: 'Штраф от 50 до 150 очков.',
            },
          ],
        },
        'English': {
          mainText: 'Main Rules',
          subText: 'If you didn\'t find an answer to your question, ask it in our',
          rules: [
            {
              title: '●1 Intentional team killing is prohibited.',
              description: 'Results in a ban when dealing 90 damage.',
            },
            {
              title: '●2 Regarding other players, any form of political conflicts, inciting interethnic discord, humiliation, personal insults, and toxic behavior are prohibited.',
              description: 'Even in the absence of moderators on the server.',
            },
            {
              title: '●3 It is forbidden to disrupt the gameplay: using serious bugs, suicide, reducing the map by more than 10%, intentionally using specific locations on the map to deceive AI bots, switching from one team to another to blatantly harm it (switching at the beginning of the round with subsequent rushing, using the Endgame mechanic to the detriment, inflicting damage to survivors, etc.).',
              description: '',
            },
            {
              title: '●4 Using a microphone with constant and loud noises is prohibited.',
              description: '',
            },
            {
              title: '●5 Playing external sound files through voice chat is prohibited.',
              description: '',
            },
            {
              title: '●6 It is prohibited to distribute (including through sprays) content that',
              description: '6.1) contains threats, calls to violence, including hidden ones, approval and encouragement of violent actions;\n6.2) discredits, insults, defames the honor and dignity or reputation or violates the privacy of other players or third parties;\n6.3) is vulgar or indecent, contains pornographic images or scenes of a sexual nature;\n6.3) contains scenes of inhumane treatment of animals.',
            },
            {
              title: '●7 Insulting administrators and moderators in any form is prohibited.',
              description: '',
            },
            {
              title: '●8 Aggressive advertising of other servers is prohibited (Explicit advertising in the in-game chat or through voice chat, as well as in the nickname).',
              description: '',
            },
            {
              title: '●9 Using all kinds of cheating programs or cheating content disguised as addons, as well as third-party programs that provide an advantage in any way (e.g., autoclickers and macros) is prohibited.',
              description: '',
            },
            {
              title: '●10 Discussing the server in a rude form is prohibited.',
              description: '',
            },
            {
              title: '●11 Any technical harm to the servers, as well as unauthorized access to the resources of the servers, is prohibited.',
              description: '',
            },
            {
              title: '●12 Adding server administrators and moderators to the Steam blacklist to prevent them from connecting to the server is prohibited.',
              description: '',
            },
            {
              title: '●13 Bypassing bans using other accounts is prohibited.',
              description: '',
            },
            {
              title: '●14 Systematic receipt of temporary bans (up to 3 bans per player) is prohibited.',
              description: '',
            },
            {
              title: '●15 Any other situations not described here are considered separately by the administration.',
              description: '',
            },
            {
              title: '●16 Administrators and moderators have the right to decide independently for how long to issue a ban.',
              description: '',
            },
            {
              title: '●17 Punishment for a violation may be reviewed by the administration for each individual case.',
              description: '',
            },
            {
              title: '●18 Administrators and moderators have the right to demand a screenshot from a player if there are doubts about the fair play of that player. Refusal or leaving the server will be considered an argument in favor of a ban, but this argument cannot be decisive.',
              description: '',
            },
            {
              title: '●19 Players have the right to challenge a ban in private messages to the VK group or in the discussion in the Steam group, while maintaining decorum.',
              description: '',
            },
            {
              title: '●20 Players have the right to complain about other players if they clearly violate the server rules and the complainant has a factual basis.',
              description: '',
            },
            {
              title: 'Additional rules for Tournaments:',
              description: '',
            },
            {
              title: '● 1 Such bugs as tank and infected teleportation, blocking passages with objects, and using "blind spots" are prohibited.',
              description: 'The match will be suspended, consequences eliminated, and your team will receive a penalty of 150 points.',
            },
            {
              title: '● 2 Unjustified switching from one team to another is prohibited.',
              description: 'The administrator-observer will move you back and issue a warning; for repeated violations, -100 points.',
            },
            {
              title: '● 3 Rushing at the very beginning of the round, if not all players have loaded and selected perks, is prohibited.',
              description: 'Penalty of 150 points. The round will be replayed.',
            },
            {
              title: '● 4 Players are prohibited from leaving the tournament during the game without a valid reason.',
              description: 'Disqualification from this tournament, resetting all merits in this tournament, punishment in the form of non-admission to other tournaments depending on the damage caused, at the discretion of the administrator-observer responsible for the tournament.',
            },
            {
              title: '● 5 Using privileges during the tournament is prohibited.',
              description: 'Penalty from 50 to 150 points.',
            },
          ],
        }
      }
    };
  },
  methods: {
    changeLanguage(lang) {
      this.currentLanguage = lang;
    },
  },
};
</script>

<template>
  <div class="max-w-screen-xl mx-auto rounded mt-10 p-4 bg-gray-100">
    <!-- Заголовок с огромным шрифтом -->
    <h1 class="text-4xl lg:text-6xl font-bold mb-2 lg:mb-4">{{ languageTexts[currentLanguage].mainText }}</h1>

    <!-- Подзаголовок с меньшим шрифтом -->
    <h2 class="text-base lg:text-xl mb-2 lg:mb-4">{{ languageTexts[currentLanguage].subText }} <a href="https://t.me/EnduranceSupport_bot" class="text-blue-500 hover:underline">Telegram Bot</a></h2>

    <!-- Кнопки переключения языка -->
    <div class="flex space-x-2 lg:space-x-4 mb-2 lg:mb-4">
      <button
          class="px-2 lg:px-4 py-1 lg:py-2 bg-gray-700 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-700"
          @click="changeLanguage('English')"
      >
        English
      </button>
      <button
          class="px-2 lg:px-4 py-1 lg:py-2 bg-gray-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-700"
          @click="changeLanguage('Русский')"
      >
        Русский
      </button>
    </div>

    <!-- Перечисление -->
    <div>
      <!-- Содержание вопросов и ответов здесь -->
      <div v-for="(rule, index) in languageTexts[currentLanguage].rules" :key="index">
        <!-- Горизонтальная полоса -->
        <div class="border-b border-gray-300 mb-2 lg:mb-4"></div>

        <div class="mb-2 lg:mb-4">
          <!-- Крупный заголовок для правила -->
          <h3 class="text-lg lg:text-xl font-semibold mb-1 lg:mb-2">{{ rule.title }}</h3>
          <!-- Текст для правила -->
          <p class="text-sm lg:text-base mb-2 lg:mb-4">{{ rule.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
