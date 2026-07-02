---
note: GC Todo
area: gigacloud
snapshot: 2026-07-02 11:43
chars: 16804
scope: above relevance marker
---
GC Todo


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


Фиксы на деве
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



Фиксы после поставки:
Обновить price type по всем ценам после поставки на проде
Проставить gov coefficient = 1
Проставить всем комп ин продуктам Is Active = true

Автоматизация
Quote validation
Добавить поле рибейт в заявках на лицензии
Автоматизировать минулого маржу для случая наличия рибейтов
Добавить возможность проставить direct input USD (UA office)
Bulk price creation
Тип цены “госы” - доработка процессов в CRM
Product description or dedicated field?
Link new prices to original prices
Триггеры копирования 
Изменение цены, компонента в продукте
Триггеры при удалении (удаление датацентра, удаление цены, удаление компонента в продукте)
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
Custom tabs
Components
Billing
General
Тестирование
Биллинг
Квоты
Проверить корректность расчета маржи и прочего
Алерты о рассинхронизации
Совместимые продукты (включая изменения)
Tabs to decide
Compatibility
Revisions
Доделать создание цен
Связка продукта
Фильтрация на детали цены
Указывать тип во всех сущ процессах
Справочник типов цен
Признак актуальности компонента в продукте
Price upon request заявки - учесть возможность такого типа заявки для железа (сейчас не учтено)
Продукты: папки по типам цен
Компоненты: папки по типам цен
Квоты: доработка на добавление стока
Привязать к квоте все цены, создаваемые в рамках Custom hardware заявок (старые + на будущее)
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
