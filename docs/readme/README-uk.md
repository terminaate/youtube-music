<div align="center">

# YouTube Music

[![GitHub release](https://img.shields.io/github/release/th-ch/youtube-music.svg?style=for-the-badge&logo=youtube-music)](https://github.com/th-ch/youtube-music/releases/)
[![GitHub license](https://img.shields.io/github/license/th-ch/youtube-music.svg?style=for-the-badge)](https://github.com/th-ch/youtube-music/blob/master/license)
[![eslint code style](https://img.shields.io/badge/code_style-eslint-5ed9c7.svg?style=for-the-badge)](https://github.com/th-ch/youtube-music/blob/master/eslint.config.mjs)
[![Build status](https://img.shields.io/github/actions/workflow/status/th-ch/youtube-music/build.yml?branch=master&style=for-the-badge&logo=youtube-music)](https://GitHub.com/th-ch/youtube-music/releases/)
[![GitHub All Releases](https://img.shields.io/github/downloads/th-ch/youtube-music/total?style=for-the-badge&logo=youtube-music)](https://GitHub.com/th-ch/youtube-music/releases/)
[![AUR](https://img.shields.io/aur/version/youtube-music-bin?color=blueviolet&style=for-the-badge&logo=youtube-music)](https://aur.archlinux.org/packages/youtube-music-bin)
[![Known Vulnerabilities](https://snyk.io/test/github/th-ch/youtube-music/badge.svg)](https://snyk.io/test/github/th-ch/youtube-music)

</div>

![Знімок екрана](/web/screenshot.png "Знімок екрана")


<div align="center">
    <a href="https://github.com/th-ch/youtube-music/releases/latest">
        <img src="../../web/youtube-music.svg" width="400" height="100" alt="YouTube Music SVG">
    </a>
</div>

Прочитайте це іншими мовами: [🏴 Англійська](../../README.md), [🇰🇷 Корейська](./README-ko.md), [🇫🇷 Французька](./README-fr.md), [🇮🇸 Ісландська](./README-is.md), [🇪🇸 Іспанська](./README-es.md), [🇷🇺 Російська](./README-ru.md), [🇺🇦 Українська](./README-uk.md), [🇭🇺 Угорська](./README-hu.md), [🇧🇷 Португальська](./README-pt.md), [🇯🇵 Японська](./README-ja.md)

**Клієнт YouTube Music на основі Electron, що має:**

- Нативний вигляд і функціонал, що має на меті зберегти оригінальний інтерфейс
- Фреймворк для користувацьких плагінів: змінюйте YouTube Music відповідно до ваших потреб (стиль, вміст, функції), вмикайте/вимикайте плагіни одним клацанням миші

## Демонстраційне зображення

|                          Екран плеєра (колірна тема альбому та режим Ambient)                                |
|:---------------------------------------------------------------------------------------------------------:|
|![Screenshot1](https://github.com/th-ch/youtube-music/assets/16558115/53efdf73-b8fa-4d7b-a235-b96b91ea77fc)|

## Зміст

- [Можливості](#Можливості)
- [Доступні плагіни](#Доступні-плагіни)
- [Переклад](#Переклад)
- [Завантажити](#Завантажити)
  - [Arch Linux](#arch-linux)
  - [MacOS](#macos)
  - [Windows](#windows)
    - [Як встановити без підключення до Інтернету? (у Windows)](#Встановлення-без-підключення-до-Інтернету-у-Windows)
- [Теми](#Теми)
- [Розробка](#Розробка)
- [Створіть власні плагіни](#Створіть-власні-плагіни)
  - [Створення плагіна](#Створення-плагіна)
  - [Поширені випадки використання](#Поширені-випадки-використання)
- [Збірка](#Збірка)
- [Попередній перегляд для producción](#Попередній-перегляд-для-production)
- [Тести](#Тести)
- [Ліцензія](#Ліцензія)
- [Поширені запитання](#Поширені-запитання)

## Можливості:

- **Автоматичне підтвердження під час паузи** (Завжди ввімкнено): вимикає спливаюче вікно ["Продовжити перегляд?"](https://user-images.githubusercontent.com/61631665/129977894-01c60740-7ec6-4bf0-9a2c-25da24491b0e.png),
    яке призупиняє музику через певний час

 - Та багато іншого...

## Доступні плагіни:

- **Блокувальник реклами**: Блокує всю рекламу та відстеження «з коробки»

- **Дії з альбомом**: Додає кнопки «Скасувати "Не подобається"», «Не подобається», «Подобається» та «Скасувати "Подобається"», щоб застосувати це до всіх пісень у списку відтворення або альбомі

- **Колірна тема альбому**: Застосовує динамічну тему та візуальні ефекти на основі колірної палітри альбому

- **Режим Ambient**: Застосовує ефект освітлення, проектуючи м'які кольори з відео на фон екрана

- **Аудіокомпресор**: Застосовує компресію до аудіо (знижує гучність найгучніших частин сигналу та підвищує гучність найтихіших частин)

- **Розмиття панелі навігації**: робить панель навігації прозорою та розмитою

- **Обхід вікових обмежень**: обходить перевірку віку YouTube

- **Вибір субтитрів**: Увімкнути субтитри

- **Компактна бічна панель**: Завжди встановлювати бічну панель у компактному режимі

- **Плавний перехід**: Плавний перехід між піснями

- **Вимкнути автопрогравання**: Кожна пісня починається в режимі "пауза"

- **[Discord](https://discord.com/) Rich Presence**: Покажіть друзям, що ви слухаєте, за допомогою [Rich Presence](https://user-images.githubusercontent.com/28219076/104362104-a7a0b980-5513-11eb-9744-bb89eabe0016.png)

- **Завантажувач**: завантажує MP3 [безпосередньо з інтерфейсу](https://user-images.githubusercontent.com/61631665/129977677-83a7d067-c192-45e1-98ae-b5a4927393be.png) [(youtube-dl)](https://github.com/ytdl-org/youtube-dl)

- **Експоненціальна гучність**: Робить повзунок гучності [експоненціальним](https://greasyfork.org/en/scripts/397686-youtube-music-fix-volume-ratio/), щоб було легше вибирати нижчу гучність

- **Меню в програмі**: [надає панелям модного, темного вигляду](https://user-images.githubusercontent.com/78568641/112215894-923dbf00-8c29-11eb-95c3-3ce15db27eca.png)

  > (дивіться [цей пост](https://github.com/th-ch/youtube-music/issues/410#issuecomment-952060709), якщо у вас виникли проблеми з доступом до меню після ввімкнення цього плагіна та опції приховування меню)

- **Скробблер**: Додає підтримку скробблінгу для [Last.fm](https://www.last.fm/) та [ListenBrainz](https://listenbrainz.org/)

- **Lumia Stream**: Додає підтримку [Lumia Stream](https://lumiastream.com/)

- **Тексти пісень Genius**: Додає підтримку текстів для більшості пісень

- **Музика разом**: Поділіться списком відтворення з іншими. Коли хост відтворює пісню, всі інші чутимуть ту саму пісню

- **Навігація**: Стрілки навігації «Вперед»/«Назад» безпосередньо інтегровані в інтерфейс, як у вашому улюбленому браузері

- **Без входу в Google**: Видаляє кнопки та посилання для входу в Google з інтерфейсу

- **Сповіщення**: Відображає сповіщення, коли починає грати пісня ([інтерактивні сповіщення](https://user-images.githubusercontent.com/78568641/114102651-63ce0e00-98d0-11eb-9dfe-c5a02bb54f9c.png) доступні у Windows)

- **Картинка в картинці**: дозволяє перемикати програму в режим «картинка в картинці»

- **Швидкість відтворення**: Слухайте швидко, слухайте повільно! [Додає повзунок, який контролює швидкість пісні](https://user-images.githubusercontent.com/61631665/129976003-e55db5ba-bf42-448c-a059-26a009775e68.png)

- **Точна гучність**: Точно керуйте гучністю за допомогою коліщатка миші/гарячих клавіш, з власним HUD та настроюваними кроками гучності

- **Гарячі клавіші (та MPRIS)**: Дозволяє встановлювати глобальні гарячі клавіші для відтворення (відтворення/пауза/наступна/попередня) + вимкнути [екранне меню медіа](https://user-images.githubusercontent.com/84923831/128601225-afa38c1f-dea8-4209-9f72-0f84c1dd8b54.png) шляхом перевизначення медіаклавіш + увімкнути Ctrl/CMD + F для пошуку + увімкнути підтримку mpris у Linux для медіаклавіш + [власні гарячі клавіші](https://github.com/Araxeus/youtube-music/blob/1e591d6a3df98449bcda6e63baab249b28026148/providers/song-controls.js#L13-L50) для [досвідчених користувачів](https://github.com/th-ch/youtube-music/issues/106#issuecomment-952156902)

- **Пропускати пісні, що не сподобалися**: Пропускає пісні, які вам не сподобалися

- **Пропускати тишу**: Автоматично пропускати тихі фрагменти

- [**SponsorBlock**](https://github.com/ajayyy/SponsorBlock): Автоматично пропускає немузичні частини, такі як інтро/аутро, або частини музичних відео, де пісня не грає

- **Керування медіа на панелі завдань**: Керуйте відтворенням з [панелі завдань Windows](https://user-images.githubusercontent.com/78568641/111916130-24a35e80-8a82-11eb-80c8-5021c1aa27f4.png)

- **TouchBar**: Власний макет TouchBar для macOS

- **Tuna OBS**: Інтеграція з плагіном [Tuna](https://obsproject.com/forum/resources/tuna.843/) для [OBS](https://obsproject.com/)

- **Зміна якості відео**: Дозволяє змінювати якість відео за допомогою [кнопки](https://user-images.githubusercontent.com/78568641/138574366-70324a5e-2d64-4f6a-acdd-dc2a2b9cecc5.png) на відеопрогравачі

- **Перемикач відео**: Додає [кнопку](https://user-images.githubusercontent.com/28893833/173663950-63e6610e-a532-49b7-9afa-54cb57ddfc15.png) для перемикання між режимом відео/пісні. Також може опціонально видалити всю вкладку відео

- **Візуалізатор**: Різні музичні візуалізатори

- **Синхронізовані тексти**: Надає синхронізовані тексти пісень, використовуючи такі джерела, як [LRClib](https://lrclib.net).

## Переклад

Ви можете допомогти з перекладом на [Hosted Weblate](https://hosted.weblate.org/projects/youtube-music/).

<a href="https://hosted.weblate.org/engage/youtube-music/">
  <img src="https://hosted.weblate.org/widget/youtube-music/i18n/multi-auto.svg" alt="статус перекладу" />
  <img src="https://hosted.weblate.org/widget/youtube-music/i18n/287x66-black.png" alt="статус перекладу 2" />
</a>

## Завантажити

Ви можете переглянути [останній реліз](https://github.com/th-ch/youtube-music/releases/latest), щоб швидко знайти найновішу версію.

### Arch Linux

Встановіть пакет [`youtube-music-bin`](https://aur.archlinux.org/packages/youtube-music-bin) з AUR. Інструкції щодо встановлення з AUR можна знайти на цій [сторінці вікі](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_packages).

### macOS

Ви можете встановити програму за допомогою Homebrew (дивіться [визначення cask](https://github.com/th-ch/homebrew-youtube-music)):

```bash
brew install th-ch/youtube-music/youtube-music
```

Якщо ви встановлюєте програму вручну та отримуєте помилку "is damaged and can’t be opened.", запустіть у Терміналі таку команду:

```bash
/usr/bin/xattr -cr /Applications/YouTube\ Music.app
```

### Windows

Ви можете використовувати [менеджер пакунків Scoop](https://scoop.sh) для встановлення пакунка `youtube-music` з [`extras` bucket](https://github.com/ScoopInstaller/Extras).

```bash
scoop bucket add extras
scoop install extras/youtube-music
```

Крім того, ви можете використовувати [Winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/), офіційний менеджер пакунків командного рядка Windows 11, для встановлення пакунка `th-ch.YouTubeMusic`.

*Примітка: Microsoft Defender SmartScreen може блокувати встановлення, оскільки воно від "невідомого видавця". Це також стосується ручного встановлення під час спроби запустити виконуваний файл (.exe) після ручного завантаження тут, на GitHub (той самий файл).*

```bash
winget install th-ch.YouTubeMusic
```

#### Як встановити без підключення до Інтернету? (у Windows)

- Завантажте файл `*.nsis.7z` для _архітектури вашого пристрою_ зі [сторінки релізів](https://github.com/th-ch/youtube-music/releases/latest).
  - `x64` для 64-розрядної Windows
  - `ia32` для 32-розрядної Windows
  - `arm64` для ARM64 Windows
- Завантажте інсталятор зі сторінки релізів. (`*-Setup.exe`)
- Розмістіть їх в **одному каталозі**.
- Запустіть інсталятор.

## Теми

Ви можете завантажити файли CSS, щоб змінити вигляд програми (Опції > Візуальні налаштування > Теми).

Деякі попередньо визначені теми доступні за адресою https://github.com/kerichdev/themes-for-ytmdesktop-player.

## Розробка

```bash
git clone https://github.com/th-ch/youtube-music
cd youtube-music
pnpm install --frozen-lockfile
pnpm dev
```

## Створіть власні плагіни

Використовуючи плагіни, ви можете:

- маніпулювати програмою - `BrowserWindow` з Electron передається обробнику плагінів
- змінювати фронтенд, маніпулюючи HTML/CSS

### Створення плагіна

Створіть теку в `src/plugins/НАЗВА_ВАШОГО_ПЛАГІНА`:

- `index.ts`: основний файл плагіна
```typescript
import style from './style.css?inline'; // імпортувати стиль як вбудований

import { createPlugin } from '@/utils';

export default createPlugin({
  name: 'Назва плагіна',
  restartNeeded: true, // якщо значення true, ytmusic покаже діалогове вікно перезапуску
  config: {
    enabled: false,
  }, // ваша власна конфігурація
  stylesheets: [style], // ваш власний стиль,
  menu: async ({ getConfig, setConfig }) => {
    // Усі методи *Config є обгорнутими Promise<T>
    const config = await getConfig();
    return [
      {
        label: 'меню',
        submenu: [1, 2, 3].map((value) => ({
          label: `значення ${value}`,
          type: 'radio',
          checked: config.value === value,
          click() {
            setConfig({ value });
          },
        })),
      },
    ];
  },
  backend: {
    start({ window, ipc }) {
      window.maximize();

      // ви можете спілкуватися з плагіном рендерера
      ipc.handle('some-event', () => {
        return 'hello';
      });
    },
    // викликається при зміні конфігурації
    onConfigChange(newConfig) { /* ... */ },
    // викликається при вимкненні плагіна
    stop(context) { /* ... */ },
  },
  renderer: {
    async start(context) {
      console.log(await context.ipc.invoke('some-event'));
    },
    // Хук, доступний лише для рендерера
    onPlayerApiReady(api: YoutubePlayer, context: RendererContext) {
      // легко встановити конфігурацію плагіна
      context.setConfig({ myConfig: api.getVolume() });
    },
    onConfigChange(newConfig) { /* ... */ },
    stop(_context) { /* ... */ },
  },
  preload: {
    async start({ getConfig }) {
      const config = await getConfig();
    },
    onConfigChange(newConfig) {},
    stop(_context) {},
  },
});
```

### Поширені випадки використання

- ін'єкція власного CSS: створіть файл `style.css` у тій самій теці, а потім:

```typescript
// index.ts
import style from './style.css?inline'; // імпортувати стиль як вбудований

import { createPlugin } from '@/utils';

export default createPlugin({
  name: 'Назва плагіна',
  restartNeeded: true, // якщо значення true, ytmusic покаже діалогове вікно перезапуску
  config: {
    enabled: false,
  }, // ваша власна конфігурація
  stylesheets: [style], // ваш власний стиль
  renderer() {} // визначити хук рендерера
});
```

- Якщо ви хочете змінити HTML:

```typescript
import { createPlugin } from '@/utils';

export default createPlugin({
  name: 'Назва плагіна',
  restartNeeded: true, // якщо значення true, ytmusic покаже діалогове вікно перезапуску
  config: {
    enabled: false,
  }, // ваша власна конфігурація
  renderer() {
    // Видалити кнопку входу
    document.querySelector(".sign-in-link.ytmusic-nav-bar").remove();
  } // визначити хук рендерера
});
```

- зв'язок між фронтендом та бекендом: можна здійснити за допомогою модуля ipcMain з Electron. Дивіться файл `index.ts` та
  приклад у плагіні `sponsorblock`.

## Збірка

1. Клонуйте репозиторій
2. Дотримуйтесь [цієї інструкції](https://pnpm.io/installation), щоб встановити `pnpm`
3. Запустіть `pnpm install --frozen-lockfile` для встановлення залежностей
4. Запустіть `pnpm build:OS`

- `pnpm dist:win` - Windows
- `pnpm dist:linux` - Linux (amd64)
- `pnpm dist:linux:deb-arm64` - Linux (arm64 для Debian)
- `pnpm dist:linux:rpm-arm64` - Linux (arm64 для Fedora)
- `pnpm dist:mac` - macOS (amd64)
- `pnpm dist:mac:arm64` - macOS (arm64)

Збирає програму для macOS, Linux та Windows,
використовуючи [electron-builder](https://github.com/electron-userland/electron-builder).

## Попередній перегляд для production

```bash
pnpm start
```

## Тести

```bash
pnpm test
```

Використовує [Playwright](https://playwright.dev/) для тестування програми.

## Ліцензія

MIT © [th-ch](https://github.com/th-ch/youtube-music)

## Поширені запитання

### Чому меню програми не відображається?

Якщо опція `Приховати меню` увімкнена - ви можете показати меню клавішею <kbd>Alt</kbd> (або <kbd>\`</kbd> [зворотний апостроф], якщо використовуєте плагін "Меню в програмі")
