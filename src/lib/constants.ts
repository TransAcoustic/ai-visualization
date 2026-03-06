import { browser, dev } from '$app/environment';
// import { version } from '../../package.json';

export const APP_NAME = 'devBim';

export const WEBUI_HOSTNAME = browser ? (dev ? `${location.hostname}:8080` : ``) : '';
export const WEBUI_BASE_URL = browser ? (dev ? `http://${WEBUI_HOSTNAME}` : ``) : ``;
export const WEBUI_API_BASE_URL = `${WEBUI_BASE_URL}/api/v1`;

/**
 * ЛОГОТИПЫ - Пути к файлам логотипов
 * 
 * ВАЖНО: Эти константы созданы для удобства, но в коде логотипы используются напрямую через:
 * `${WEBUI_BASE_URL}/static/favicon.png` и т.д.
 * 
 * Для замены логотипов нужно:
 * 1. Заменить файлы в папке static/static/:
 *    - favicon.png (основной favicon)
 *    - favicon-dark.png (favicon для темной темы)
 *    - splash.png (логотип на экране загрузки)
 *    - splash-dark.png (логотип на экране загрузки для темной темы)
 * 
 * 2. Или найти и заменить все упоминания в следующих файлах:
 * 
 * FAVICON (favicon.png):
 * - src/app.html (строка 5) - <link rel="icon">
 * - src/routes/+layout.svelte (строки 365, 857) - уведомления и meta тег
 * - src/lib/components/layout/Sidebar.svelte (строки 693, 891) - боковое меню
 * - src/routes/auth/+page.svelte (строки 244, 590) - страница авторизации
 * - src/routes/(app)/workspace/models/create/+page.svelte (строка 38) - создание модели
 * - src/lib/components/workspace/Models/ModelEditor.svelte (строки 74, 448, 464, 500) - редактор моделей
 * - src/lib/components/chat/Messages/ProfileImage.svelte (строки 5, 11) - изображения профилей
 * - src/lib/components/channel/WebhookItem.svelte (строки 93, 127) - вебхуки
 * - src/lib/components/app/AppSidebar.svelte (строка 53) - боковое меню приложения
 * - src/lib/components/OnBoarding.svelte (строка 49) - онбординг
 * - src/lib/components/NotificationToast.svelte (строка 88) - уведомления
 * - src/lib/components/admin/Settings/Evaluations/ArenaModelModal.svelte (строки 40, 96) - модальное окно
 * 
 * FAVICON DARK (favicon-dark.png):
 * - src/routes/auth/+page.svelte (строки 154, 157) - страница авторизации (темная тема)
 * - src/lib/components/OnBoarding.svelte (строки 22, 25) - онбординг (темная тема)
 * 
 * SPLASH (splash.png):
 * - src/app.html (строки 93, 141) - экран загрузки
 * - src/lib/components/app/AppSidebar.svelte (строка 29) - боковое меню приложения
 * 
 * SPLASH DARK (splash-dark.png):
 * - src/app.html (строка 93) - экран загрузки (темная тема)
 * 
 * ДОПОЛНИТЕЛЬНЫЕ ФАЙЛЫ ЛОГОТИПОВ (также в static/static/):
 * - favicon-96x96.png (src/app.html, строка 9)
 * - favicon.svg (src/app.html, строка 16)
 * - favicon.ico (src/app.html, строка 19)
 * - apple-touch-icon.png (src/app.html, строка 23)
 */
export const LOGO_FAVICON = `${WEBUI_BASE_URL}/static/favicon.png`;	
export const LOGO_FAVICON_DARK = `${WEBUI_BASE_URL}/static/favicon-dark.png`;
export const LOGO_SPLASH = `${WEBUI_BASE_URL}/static/splash.png`;
export const LOGO_SPLASH_DARK = `${WEBUI_BASE_URL}/static/splash-dark.png`;

export const OLLAMA_API_BASE_URL = `http://localhost:5173/ollama`;
export const OPENAI_API_BASE_URL = `http://localhost:5173/openai`;
export const AUDIO_API_BASE_URL = `http://localhost:5173/api/v1/audio`;
export const IMAGES_API_BASE_URL = `http://localhost:5173/api/v1/images`;
export const RETRIEVAL_API_BASE_URL = `http://localhost:5173/api/v1/retrieval`;

export const WEBUI_VERSION = APP_VERSION;
export const WEBUI_BUILD_HASH = APP_BUILD_HASH;
export const REQUIRED_OLLAMA_VERSION = '0.1.16';

export const SUPPORTED_FILE_TYPE = [
	'application/epub+zip',
	'application/pdf',
	'text/plain',
	'text/csv',
	'text/xml',
	'text/html',
	'text/x-python',
	'text/css',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/octet-stream',
	'application/x-javascript',
	'text/markdown',
	'audio/mpeg',
	'audio/wav',
	'audio/ogg',
	'audio/x-m4a'
];

export const SUPPORTED_FILE_EXTENSIONS = [
	'md',
	'rst',
	'go',
	'py',
	'java',
	'sh',
	'bat',
	'ps1',
	'cmd',
	'js',
	'ts',
	'css',
	'cpp',
	'hpp',
	'h',
	'c',
	'cs',
	'htm',
	'html',
	'sql',
	'log',
	'ini',
	'pl',
	'pm',
	'r',
	'dart',
	'dockerfile',
	'env',
	'php',
	'hs',
	'hsc',
	'lua',
	'nginxconf',
	'conf',
	'm',
	'mm',
	'plsql',
	'perl',
	'rb',
	'rs',
	'db2',
	'scala',
	'bash',
	'swift',
	'vue',
	'svelte',
	'doc',
	'docx',
	'pdf',
	'csv',
	'txt',
	'xls',
	'xlsx',
	'pptx',
	'ppt',
	'msg'
];

export const DEFAULT_CAPABILITIES = {
	file_context: true,
	vision: true,
	file_upload: true,
	web_search: true,
	image_generation: true,
	code_interpreter: true,
	citations: true,
	status_updates: true,
	usage: undefined,
	builtin_tools: true
};

export const PASTED_TEXT_CHARACTER_LIMIT = 1000;

// Source: https://kit.svelte.dev/docs/modules#$env-static-public
// This feature, akin to $env/static/private, exclusively incorporates environment variables
// that are prefixed with config.kit.env.publicPrefix (usually set to PUBLIC_).
// Consequently, these variables can be securely exposed to client-side code.
