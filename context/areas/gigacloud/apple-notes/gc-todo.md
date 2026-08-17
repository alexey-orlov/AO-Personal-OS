---
note: GC Todo
area: gigacloud
snapshot: 2026-08-17 08:00
chars: 19919
scope: above relevance marker
---
GC Todo


[redacted by notes-sync: 24-char key-like string]

Формула

Sales margin = «ціна продажу» - «мінімальна ціна» + «рібейти» =  
Monthly_Price*(100% - Discount, %) – Monthly_Price * (100% - Current gross margin, %) / (100% - Min margin, %) + «рібейти»


Max discount = 1 – (Total COGS, UA Region, UAH / Price, UAH + Min margin, %) * 100% 

Новые стримы
Илья - помощь по Infra services
Миша - помощь

Квартальные проекты и кейденс
Преза для викли митов
Актуальность проектов в Jira


Todo



Gov
531b5fdd-ebd8-49fa-8bab-fa4446b25921

Non-gov
36e6677e-f441-4d9d-867b-66e772837a9a

Фиксы на вроде
Проставить дефолтные версии галочек 
Удалить чеклисты для гос
Обновить текущие статусы в чекисте
Component. Field auto-filling: Hardware details (Comp node, GPU only) + Min margin - поменять версию
Revisions. Approval - поменять версию
Product catalogue. Sync gov product - поменять версию после поставки
Price item: Field calculation helper: Pricing fields - поменять версию после поставки
Price item. Field auto-filling: current margin, max discount - поменять версию
Active (spec infra products): required fields - (2) business rules, product page
Product catalogue. Publication: Verify draft product - product catalogue, verification

Прятать:
Technical details
Available datacenter
Product documentation
FAQ
Proof of concept
Presales process
Delivery timelines
Delivery & support processes
Requests to delivery


ToDo:
Цены
Может ли быть Quote-only цена current price item? - НЕТ, исправить данные и процесс
Может ли не быть current Price item? - НЕТ, найти проблему + исправить данные

Синк с Настей по Price upon request: использование хелперов + именование процессов и складывание в папки + условия с датами
Эдик - дать атрибуты gov версий договоров
Дефиниции полей Infrastructure type, Virtualization platform
Продакт категории для Third-party service
Allowed infrastructure types - добавилить поле add-on mode; 
Allowed infrastructure types - для лицензий и our services указать, что private / public только для add-on.
Allowed component families - указать product category для кейса memory tiering
Allowed contract types - Add-on mode заполнить 
В заявках на custom software выделить отдельный шаг на продакта по заведению продукта, компонент группы
Allowed responsible for product design - добавить поле с product category (для инфосека в add-on tools)
Bundles (protected cloud package + Gov Data Protection Package) - Contract type исправить
Подтверждение от вендор менеджмент, что они ответственные за product design
Delivery processes для бесплатных продуктов и некоторых лицензий:
Client-controlled incident support
Managed cloud support 
Zimbra license
SysElegance Application Server License
Zerto Licenses
Microsoft Azure
Amazon Web Services (AWS)
Kubernetes for Private Cloud on Azure Local
Relational DB for Private Cloud on VMware
AI Enterprise by NVIDIA
Virtual Desktops by Omnissa for Private Cloud on VMware
Private Spare Node
GPU for Private Infrastructure
Private Backup
Private Cloud Disaster Recovery on VMware
Veeam Backup & Replication License (https://crm.gigacloud.eu/0/Shell/#Card/UsrProductCatalogue_FormPage/edit/ea295454-48e9-470e-a3dc-f8dc405843fd) 
Private Cloud on OpenStack HCI  - указан процесс, описание которого не соответствует продукту. По идее, у нас есть отдельный процесс для разовой настройки силами РнД - наверное, стоит указать его? “Infrastructure / Flow 1: First setup by R&D, then - hand-off to Delivery”
Разрешить пустой delivery process для бантов
VMware, Microsoft, Cisco - не реселл ли? Квал доход? Наценка?
Список продуктов, которые не реселл - 
Vendors - поля для галочек про возможность дистрибуции в других регионах
Видео по Gov prices
Vendors - read-only поля


Фиксы после поставки:
Проставить gov coefficient = 1
Обновить price type по всем ценам после поставки на проде
Проставить всем комп ин продуктам Is Active = true

Автоматизация
Quote validation
Закрыть возможность ставить мин маржу непосредственно в компоненте, синхронизировать текущие значения
Запрет добавления одной и той же пары компонента в про
Ошибки
Новая цена - не создается
Не скопировалась цена в евро
Тип цены “госы” - доработка процессов в CRM
Custom tabs
Components - show gov prices only / no gov prices only
Billing
General
Tabs to decide
Revisions
Compatibility
Проверить корректность расчета маржи и прочего
Совместимые продукты (включая изменения)
Тестирование
Триггеры копирования 
Триггеры при удалении (удаление цены, удаление компонента в продукте)
Изменение цены, компонента в продукте
изменение продукта
Управление статусами
Дезактивация родительского продукта
Деактивация gov продукта
Верификация и публикация gov продукта
Внесение изменений в продукт через UI в активном продукте или неактивном продукте
Ревизии по описаниям - протестировать
Блокировать все изменения просто на странице (кроме описаний - для неактивных продуктов)
Блокировать все изменения  в рамках ревизий кроме описаний
QUESTIONS??
Components
Revisions
Datacenters
Product documentation
FAQ
Requests to R&D
Additional R&D materials
Info (FAQ, Product documentsation)
Tabs to “Hide”
Contracts
Tech details
Delivery
Presales
R&D
Квоты
Биллинг
Product description or dedicated field?
Link new prices to original prices
Доделать создание цен
Связка продукта
Фильтрация на детали цены
Указывать тип во всех сущ процессах
Справочник типов цен
Price upon request заявки - учесть возможность такого типа заявки для железа (сейчас не учтено)
Продукты: папки по типам цен
Компоненты: папки по типам цен
Квоты: доработка на добавление стока
Привязать к квоте все цены, создаваемые в рамках Custom hardware заявок (старые + на будущее)
Признак актуальности компонента в продукте
Автоматизировать минулого маржу для случая наличия рибейтов
Добавить возможность проставить direct input USD (UA office)
Bulk price creation
Добавить поле рибейт в заявках на лицензии
Spare node - доработка в формуле (см. чат с Эдиком)
Стандартная цена - что это такое - обсудить
Дашборд по Product Insights
Процесс отметок продуктов на проду в соответствии с положенным


Product Issues
Привязка к продажам - Руслана, Дмитренко


Заявки на партнерские продукты


Бонусная схема
Отправка Job offers
Презентация от Ильи


Доуточнение процесса PLM
Согласование договора - процесс в CRM
Минимальные коммитенты перед вендорами


Чеклист запуска продукта:
Наличие подписанного договора с поставщиком / поставщиками лицензий




Передача задач
Схема по типам заявок
Tooltips in price items
Supplier price, units included - field in price item
Component group fields
Cхема процессов
Объектная схема:
Quotes
Price items <> Components
Hardware equipment <> Components
Почему не подтянулись процессы в страницы настроек


Функционал
Product catalogue
Product data model overview
Verification, publication and approval + discontinuation
Contract-related fields
Billing integration
Components
Data model overview
Component groups
Vendors
Activation + deactivation
Field auto-filling
Pricing
Data model overview
Currencies
System settings (in products)
Calculation methods
Synchronisation with component
Calculated fields
Scheme
COGS recalculation
Real margin / max discount recalculation
Hardware equipment
Data model overview
Price logging
Price creation
Revisions
Creation + approval + notifications
Approval and notifications customization
Responsible teams
Creation triggers
Requests
Creation workflows (from section, component page or product page)
Table by types
Data model
Processing workflows
Permissions / roles
Functional roles
