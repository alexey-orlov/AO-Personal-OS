# GigaCloud — назви епіків Q2'2026 (для Jira)

Джерело: Miro-борд **GigaCloud** → фрейм **"Q2 plans 2026"** (кольорові листики = епіки).
Патерн наймінгу — за епіками попереднього кварталу в Jira.

## Патерн (з минулого кварталу)

`[TAG] <Тема/Продукт>: <конкретика>` або `[TAG] <конкретна фраза>`

Приклади-еталони: `[Cost-effective] Опції оптимізації: RAM tiering` · `[GTM - IAAS] Azure Local: перепаковка` · `[GTM - RESALE] VCFaaS: ліцензії Broadcom...` · `[Cloud diversification] Private Cloud/Backup/DR on Nutanix` · `[EFFCY] Analytics - Lost opportunities ongoing analysis`.

Мова — українська; продуктові/технічні назви лишаю англійською, як в еталонах. TAG епіка = тема його TOP KR (гранулярніше за objective-дужку на жовтому листику).

## TAG ↔ TOP KR ↔ Objective

| TAG | TOP KR (рядок на борді) | Objective |
|---|---|---|
| `[GTM - IAAS]` | Розвиток існуючих продуктів (sales enablement) | GTM · IaaS |
| `[Cost-effective]` | Cost-ефективність і маржинальність IaaS (≈ TOP-178 / TOP-204) | GTM · IaaS |
| `[Cloud diversification]` | Стратегічна диверсифікація хмарних рішень (≈ TOP-179) | GTM · IaaS |
| `[GTM - IAAS]` (sales) | Збільшення ефективності відділу продажів (≈ TOP-197) | GTM · IaaS |
| `[GTM - RESALE]` | Зростання через ресел Microsoft/Amazon/Veeam (≈ TOP-201) | GTM · Resell |
| `[GTM - PROF SERVICES]` | Зростання через проф сервіси кібербез, AI/DevOps (≈ TOP-203) | GTM · Services |
| `[EFFCY]` | Data-driven прийняття рішень (≈ TOP-194) | Business efficiency |
| `[EFFCY]` (PLM) | Прозорий PLM (≈ TOP-206) | Business efficiency |

## Легенда кольорів = власники (з листиків-легенди зверху фрейму)

фіолетовий = **Анастасія** · голубий = **Едуард** · зелений = **Василина** · червоний = **Олексій**

---

## Активні епіки (в межах контейнерів NEW PRODUCTS + IMPROVEMENT/AUTOMATION)

### [GTM - IAAS] · Розвиток існуючих продуктів
| # | Назва епіка | Власник | Джерело (листик) |
|---|---|---|---|
| 1 | **[GTM - IAAS] Public Cloud on OpenStack: рефакторинг** | Едуард | Public Cloud on OpenStack refactoring |
| 2 | **[GTM - IAAS] Private Server: документація продукту** | Едуард | Private Server - documentation |
| 3 | **[GTM - IAAS] Продуктивність дискової підсистеми Public Cloud (СЗД)** | зелений | Питання продуктивності СЗД - задача із списком |

### [Cost-effective] · Cost-ефективність і маржинальність IaaS
| # | Назва епіка | Власник | Джерело (листик) |
|---|---|---|---|
| 1 | **[Cost-effective] VCFaaS v.2: запуск через партнера** | Анастасія | VCFaaS v.2 через партнера |
| 2 | **[Cost-effective] Переоцінка сегменту Telecom** | Анастасія | Переоцінка Telecom |
| 3 | **[Cost-effective] Trade-in обладнання: купівля/продаж вживаного заліза** | Едуард | Возможность покупать и продавать старое оборудование |
| 4 | **[Cost-effective] Private Cloud on VMware vSAN** | Едуард | Private Cloud on VMware vSAN |
| 5 | **[Cost-effective] Переоцінка: політика та автоматизація** | Олексій | Політика і автоматизація переоцінки |
| 6 | **[Cost-effective] Min margin на базі unit-економіки** | Едуард | Розрахунок min margin на базі unit економіки |
| 7 | **[Cost-effective] Фіксовані ціни під клієнта** | Олексій | Фіксовані ціни під клієнта |

### [Cloud diversification] · Стратегічна диверсифікація хмарних рішень
| # | Назва епіка | Власник | Джерело (листик) |
|---|---|---|---|
| 1 | **[Cloud diversification] Private Cloud on Nutanix: режим "по запиту"** | Едуард | Private Cloud on Nutanix в режимі "по запиту" |
| 2 | **[Cloud diversification] Public / Private Kubernetes** | Едуард | Public / Private Kubernetes |
| 3 | **[Cloud diversification] Clouds on VMware через партнера 11x11 (re-pricing + міграція клієнтів)** | Анастасія | Партнерство із 11х11 / Clouds on VMware through 11x11 |

### [GTM - IAAS] · Збільшення ефективності відділу продажів
| # | Назва епіка | Власник | Джерело (листик) |
|---|---|---|---|
| 1 | **[GTM - IAAS] Sales enablement: майстер формування квот** | Едуард | Майстер формування квот |

### [GTM - RESALE] · Зростання через ресел
| # | Назва епіка | Власник | Джерело (листик) |
|---|---|---|---|
| 1 | **[GTM - RESALE] Кастомні ціни на ліцензії під проект** | Анастасія | Кастомные цены на лицензии под проект |
| 2 | **[GTM - RESALE] Contract types: Hyperscaler PAYG resale / VCFaaS** | Анастасія | Finalize 2 contract types: Hyperscaler PAYG resale / VCFaaS |
| 3 | **[GTM - RESALE] Схеми дистрибуції по регіонах і валютах + фіксація в CRM** | Анастасія | Валюты и регионы: впорядкування схем дистрибуції |
| 4 | **[GTM - RESALE] Автоматизація контролю коректності цін** | Олексій | Автоматизація контролю коректності цін |

### [GTM - PROF SERVICES] · Зростання через проф сервіси
| # | Назва епіка | Власник | Джерело (листик) |
|---|---|---|---|
| 1 | **[GTM - PROF SERVICES] Ресел партнерських продуктів кібербезпеки** | Василина | Ресел кібербез: партнерські продукти з кібербезпеки |
| 2 | **[GTM - PROF SERVICES] Contract types для сервісів: власні / resale** | Анастасія | Контракты для сервисов: our services / resale services |

### [EFFCY] · Data-driven прийняття рішень
| # | Назва епіка | Власник | Джерело (листик) |
|---|---|---|---|
| 1 | **[EFFCY] Churn reasons в CRM** | Василина | Churn reasons in CRM |
| 2 | **[EFFCY] Покриття інсайтами: lost opportunities + issues** | Василина | Покриття інсайтами lost opportunities + issues |
| 3 | **[EFFCY] Дані продажів у продуктовому каталозі** | Олексій | Дані по продажах продуктів в продуктовому каталозі |

### [EFFCY] · Прозорий PLM
| # | Назва епіка | Власник | Джерело (листик) |
|---|---|---|---|
| 1 | **[EFFCY] PLM: автоматизація додаткових кроків** | Олексій | PLM: автоматизація додаткових кроків |

---

## НА МАЙБУТНЄ (права колонка фрейму — беклог/ідеї, кольорові)

Прив'язка до KR приблизна (за рядком). Промотувати в активні за потреби.

| Назва епіка | Власник | Джерело (листик) |
|---|---|---|
| **[GTM - IAAS] Modular Private Cloud** | Едуард | Modular Private Cloud |
| **[GTM - IAAS] Datamodel у CRM для product-marketing даних** | Олексій | Datamodel в CRM для product marketing |
| **[GTM - IAAS] Fortanix / VDI: promo для продовження контрактів** | Анастасія | Fortanix / VDI: promo |
| **[Cost-effective] Low-cost bare-metal сервери (Hetzner-подібні)** | Едуард | Low-cost bare-metal servers (aka Hetzner) |
| **[Cost-effective] Політика знижок за довгострокові контракти** | Анастасія | Політика знижок за умови довгострокових контрактів |
| **[Cost-effective] Переоцінка складу для стимулювання продажів** | Анастасія | Перегляд ціноутворення складу |
| **[GTM - IAAS] ROI-калькулятор для сейлів** | Едуард | ROI калькулятор |
| **[GTM - IAAS] Доступність обладнання: інтеграція в CRM** | зелений | Питання доступності обладнання: інтеграція в CRM |
| **[GTM - RESALE] AWS / Azure resell: автоматизація фіксації маржі** | Анастасія | AWS / Azure resell: автоматизація |
| **[GTM - RESALE] AWS / Azure resell workflow: фіксація в CRM** | Анастасія | AWS / Azure resell workflow |
| **[GTM - RESALE] VCFaaS: фіксація contract-type процесу в CRM** | Анастасія | Contract types для VCFaaS |
| **[GTM - RESALE] Ресел: контроль термінів підписок і власників** | Анастасія | Реселл: фіксація і контроль термінів підписки |
| **[GTM - PROF SERVICES] Кібербезпека для SMB** | Василина | Кибербез для SMB |
| **[GTM - PROF SERVICES] Спрощене заведення продуктів third-party services** | Олексій | Спрощений процес заведення продуктів third-party services |
| **[EFFCY] AI meeting insights у CRM** | Василина | AI Meeting insights in CRM |
| **[EFFCY] PLM: формалізація неписаних бізнес-правил у CRM** | Олексій | Формалізація "неписаних" бізнес-правил в CRM |

---

## Нотатки / що перевірити

- **PLM (розбіжність зі скріншотом).** На живому борді з PLM-блоку тільки *«автоматизація додаткових кроків»* — червоний (епік). Решта PLM-карток — **сірі** (не в кольорах-епіках): «управління шаблонами контрактів», «автоматичні задачі і сповіщення на команди», «sales enablement інформація», «майстер створення продукту». На твоєму скріншоті вони червоні. Якщо це теж епіки — назви: `[EFFCY] PLM: управління шаблонами контрактів` · `[EFFCY] PLM: авто-задачі та сповіщення командам` · `[EFFCY] PLM: sales enablement інформація` · `[EFFCY] PLM: майстер створення продукту`.
- **Не епіки (навмисно пропущено):** сірі листики = нотатки/під-кроки (Pipeline data from sales, Price upon request, зустрічі/листи фіксації тощо); жовті = KR-мітки та дальній беклог ідей (k8s on openstack, churn rate, держсектор-безпека тощо); помаранчеві = objectives.
- **Приблизні прив'язки до KR (за позицією):** `VCFaaS v.2` і `VMware vSAN` стоять у рядку Cost-effective (можуть бути ближче до «Розвитку продуктів»); `Автоматизація контролю цін` — у рядку Resell (може бути Cost-effective). Легко пересунути.
