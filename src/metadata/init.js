/* eslint-disable */
module.exports = function meta_init($p) {

$p.wsql.alasql('USE md; CREATE TABLE IF NOT EXISTS `ireg_log_view` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, `key` CHAR, `user` CHAR); CREATE TABLE IF NOT EXISTS `doc_work_centers_task` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, posted boolean, date Date, number_doc CHAR, `ts_cuts` JSON, `ts_cutting` JSON); CREATE TABLE IF NOT EXISTS `cat_characteristics` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `predefined_name` CHAR, `owner` CHAR); CREATE TABLE IF NOT EXISTS `cat_formulas` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `formula` CHAR, `leading_formula` CHAR, `condition_formula` BOOLEAN, `definition` CHAR, `template` CHAR, `sorting_field` INT, `async` BOOLEAN, `disabled` BOOLEAN, `context` INT, `jsx` BOOLEAN, `captured` BOOLEAN, `editor` CHAR, `predefined_name` CHAR, `parent` CHAR, `ts_params` JSON); CREATE TABLE IF NOT EXISTS `cat_nom_prices_types` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `price_currency` CHAR, `discount_percent` FLOAT, `vat_price_included` BOOLEAN, `rounding_order` CHAR, `rounding_in_a_big_way` BOOLEAN, `note` CHAR, `predefined_name` CHAR); CREATE TABLE IF NOT EXISTS `cat_tags` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `synonym` CHAR, `predefined_name` CHAR); CREATE TABLE IF NOT EXISTS `cat_articles` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `h1` CHAR, `descr` CHAR, `introduction` CHAR, `content` CHAR, `img` CHAR, `date` Date, `author` CHAR, `sorting_field` INT, `published` BOOLEAN, `formula` CHAR, `category` CHAR, `footer` BOOLEAN, `social` BOOLEAN, `predefined_name` CHAR, `parent` CHAR, `ts_tags` JSON, `ts_articles` JSON, `ts_aliases` JSON, `ts_acl` JSON, `ts_acl_att` JSON); CREATE TABLE IF NOT EXISTS `cat_users` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `invalid` BOOLEAN, `note` CHAR, `ancillary` BOOLEAN, `predefined_name` CHAR, `ts_extra_fields` JSON, `ts_contact_information` JSON); CREATE TABLE IF NOT EXISTS `cat_organizations` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `prefix` CHAR, `individual_legal` CHAR, `inn` CHAR, `kpp` CHAR, `ogrn` CHAR, `predefined_name` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_nom` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `article` CHAR, `nom_kind` CHAR, `captured` BOOLEAN, `editor` CHAR, `predefined_name` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_destinations` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `used` BOOLEAN, `predefined_name` CHAR, `parent` CHAR, `ts_extra_fields` JSON, `ts_extra_properties` JSON); CREATE TABLE IF NOT EXISTS `cat_partners` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `name_full` CHAR, `note` CHAR, `inn` CHAR, `kpp` CHAR, `ogrn` CHAR, `okpo` CHAR, `individual_legal` CHAR, `predefined_name` CHAR, `parent` CHAR, `ts_contact_information` JSON, `ts_extra_fields` JSON); CREATE TABLE IF NOT EXISTS `cat_accounts` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `prefix` CHAR, `push_only` BOOLEAN, `subscription` BOOLEAN, `ips` CHAR, `suffix` CHAR, `direct` BOOLEAN, `predefined_name` CHAR, `owner` CHAR, `ts_acl_objs` JSON, `ts_subscribers` JSON, `ts_ids` JSON); CREATE TABLE IF NOT EXISTS `cat_property_values` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `heft` FLOAT, `full_name` CHAR, `captured` BOOLEAN, `editor` CHAR, `predefined_name` CHAR, `owner` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_currencies` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `name_full` CHAR, `extra_charge` FLOAT, `main_currency` CHAR, `parameters_russian_recipe` CHAR, `predefined_name` CHAR); CREATE TABLE IF NOT EXISTS `cch_predefined_elmnts` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `value` CHAR, `definition` CHAR, `synonym` CHAR, `list` INT, `captured` BOOLEAN, `editor` CHAR, `predefined_name` CHAR, `parent` CHAR, `type` CHAR, `ts_elmnts` JSON); CREATE TABLE IF NOT EXISTS `cch_properties` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `shown` BOOLEAN, `sorting_field` INT, `extra_values_owner` CHAR, `available` BOOLEAN, `mandatory` BOOLEAN, `include_to_name` BOOLEAN, `list` INT, `note` CHAR, `destination` CHAR, `tooltip` CHAR, `caption` CHAR, `is_extra_property` BOOLEAN, `include_to_description` BOOLEAN, `calculated` CHAR, `showcalc` BOOLEAN, `synonym` CHAR, `inheritance` INT, `captured` BOOLEAN, `editor` CHAR, `predefined_name` CHAR, `type` JSON, `ts_use` JSON, `ts_hide` JSON); CREATE TABLE IF NOT EXISTS `enm_individual_legal` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_elm_types` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_nom_types` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_gender` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_orientations` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_category_sections` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_tags_category` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_debit_credit_kinds` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_accumulation_record_type` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); ', []);

$p.md.init({"enm":{"accumulation_record_type":[{"order":0,"name":"debit","synonym":"Приход"},{"order":1,"name":"credit","synonym":"Расход"},{"tag":"Вид движения регистра накопления","description":"Системное перечисление"}],"debit_credit_kinds":[{"order":0,"name":"Приход","synonym":"Приход","latin":"debit"},{"order":1,"name":"Расход","synonym":"Расход","latin":"credit"},{"tag":"Виды движений приход/расход"}],"tags_category":[{"order":0,"name":"task","synonym":"Задача"},{"order":1,"name":"menu","synonym":"Меню"},{"order":2,"name":"news","synonym":"Новость"},{"order":3,"name":"contents","synonym":"Оглавление"},{"order":4,"name":"article","synonym":"Статья"},{"order":5,"name":"file","synonym":"Файл"},{"default":"article"},{"tag":"Категории тегов"}],"category_sections":[{"order":0,"name":"activity","synonym":"Активность"},{"order":1,"name":"task","synonym":"Задача"},{"order":2,"name":"article","synonym":"Материал"},{"tag":"Классы категорий тегов"}],"orientations":[{"order":0,"name":"Горизонтальная","synonym":"Горизонтальная","latin":"hor"},{"order":1,"name":"Вертикальная","synonym":"Вертикальная","latin":"vert"},{"order":2,"name":"Наклонная","synonym":"Наклонная","latin":"incline"},{"tag":"Ориентация элемента"}],"gender":[{"order":0,"name":"Мужской","synonym":"Мужской"},{"order":1,"name":"Женский","synonym":"Женский"},{"tag":"Пол физических Лиц"}],"nom_types":[{"order":0,"name":"Товар","synonym":"Товар, материал","latin":"goods"},{"order":1,"name":"Услуга","synonym":"Услуга","latin":"service"},{"order":2,"name":"Работа","synonym":"Работа, техоперация","latin":"operation"},{"default":"Товар"},{"tag":"Типы номенклатуры"}],"elm_types":[{"order":0,"name":"Рама","synonym":"Рама","latin":"rama"},{"order":1,"name":"Створка","synonym":"Створка","latin":"flap"},{"order":2,"name":"СтворкаБИ","synonym":"Створка безимпостная","latin":"flap0"},{"order":3,"name":"Импост","synonym":"Импост","latin":"impost"},{"order":4,"name":"Штульп","synonym":"Штульп","latin":"shtulp"},{"order":5,"name":"Ряд","synonym":"Профиль ряда","latin":"region"},{"order":6,"name":"Стекло","synonym":"Стекло - стеклопакет","latin":"glass"},{"order":7,"name":"Заполнение","synonym":"Заполнение - сэндвич","latin":"sandwich"},{"order":8,"name":"Раскладка","synonym":"Раскладка - фальшпереплет","latin":"layout"},{"order":9,"name":"Текст","synonym":"Текст","latin":"text"},{"order":10,"name":"Линия","synonym":"Линия","latin":"line","note":"Произвольная линия (путь)"},{"order":11,"name":"Размер","synonym":"Размер","latin":"size","note":"Размерная линия"},{"order":12,"name":"Радиус","synonym":"Радиус","latin":"radius","note":"Размерная линия радиуса"},{"order":13,"name":"Угол","synonym":"Угол","latin":"angle","note":"Размерная линия угла"},{"order":14,"name":"Сечение","synonym":"Сечение","latin":"cut"},{"order":15,"name":"Штапик","synonym":"Штапик","latin":"glbead"},{"order":16,"name":"Добор","synonym":"Добор изнутри","latin":"addition"},{"order":17,"name":"ДоборСнаружи","synonym":"Добор cнаружи","latin":"addition_outer"},{"order":18,"name":"Соединитель","synonym":"Соединит. профиль","latin":"linking"},{"order":19,"name":"Связка","synonym":"Связка элементов","latin":"bundle"},{"order":20,"name":"Разрыв","synonym":"Разрыв заполнения","latin":"tearing","note":"Профиль разрыва заполнения"},{"order":21,"name":"Проем","synonym":"Проем","latin":"portal","note":"Профиль проёма"},{"order":22,"name":"Вложение","synonym":"Вирт. конт. вложения","latin":"attachment"},{"order":23,"name":"Водоотлив","synonym":"Водоотлив","latin":"drainage"},{"order":24,"name":"Москитка","synonym":"Москитн. сетка","latin":"mosquito"},{"order":25,"name":"Примыкание","synonym":"Примыкание","latin":"adjoining"},{"order":26,"name":"Перекрытие","synonym":"Перекрытие","latin":"floor"},{"order":27,"name":"Фурнитура","synonym":"Фурнитура","latin":"furn"},{"order":28,"name":"СоставнойПуть","synonym":"Составной путь","latin":"compound"},{"order":29,"name":"Макрос","synonym":"Макрос обр центра","latin":"macro"},{"order":30,"name":"Подоконник","synonym":"Подоконник","latin":"sill"},{"order":31,"name":"ОшибкаКритическая","synonym":"Ошибка критическая","latin":"error"},{"order":32,"name":"ОшибкаИнфо","synonym":"Ошибка инфо","latin":"info"},{"order":33,"name":"Визуализация","synonym":"Визуализация","latin":"visualization"},{"order":34,"name":"Прочее","synonym":"Прочее","latin":"other"},{"order":35,"name":"Продукция","synonym":"Продукция","latin":"product"},{"order":36,"name":"Доставка","synonym":"Доставка","latin":"delivery"},{"order":37,"name":"РаботыЦеха","synonym":"Работы цеха","latin":"work"},{"order":38,"name":"Монтаж","synonym":"Монтаж","latin":"mounting"},{"order":39,"name":"Уплотнение","synonym":"Уплотнение","latin":"gasket"},{"order":40,"name":"Арматура","synonym":"Армирование","latin":"reinforcement"},{"order":41,"name":"Порог","synonym":"Порог","latin":"doorstep"},{"order":42,"name":"Подставочник","synonym":"Подставочн. профиль"},{"tag":"Типы элементов","description":"Определяют поведение элемента в графическом построителе. Не рекомендуется использовать для группировки номенклатур, т.к. один и тот же материал может выступать элементами разных типов"}],"individual_legal":[{"order":0,"name":"ЮрЛицо","synonym":"Юрлицо"},{"order":1,"name":"ФизЛицо","synonym":"Физлицо"},{"tag":"Юр/ФизЛицо"}]},"ireg":{"log":{"name":"log","note":"","synonym":"Журнал событий","dimensions":{"date":{"synonym":"Дата","tooltip":"Время события","type":{"types":["number"],"digits":15,"fraction":0}},"sequence":{"synonym":"Порядок","tooltip":"Порядок следования","type":{"types":["number"],"digits":6,"fraction":0}}},"resources":{"class":{"synonym":"Класс","tooltip":"Класс события","type":{"types":["string"],"str_len":100}},"note":{"synonym":"Комментарий","multiline_mode":true,"tooltip":"Текст события","type":{"types":["string"],"str_len":0}},"obj":{"synonym":"Объект","multiline_mode":true,"tooltip":"Объект, к которому относится событие","type":{"types":["string"],"str_len":0}},"user":{"synonym":"Пользователь","tooltip":"Пользователь, в сеансе которого произошло событие","type":{"types":["string"],"str_len":100}}}},"log_view":{"name":"log_view","note":"","synonym":"Просмотр журнала событий","dimensions":{"key":{"synonym":"Ключ","tooltip":"Ключ события","type":{"types":["string"],"str_len":100}},"user":{"synonym":"Пользователь","tooltip":"Пользователь, отметивыший событие, как просмотренное","type":{"types":["string"],"str_len":100}}}}},"cat":{"currencies":{"name":"Валюты","splitted":false,"synonym":"Валюты","illustration":"Валюты, используемые при расчетах","obj_presentation":"Валюта","list_presentation":"","input_by_string":["name","id"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":"name","code_length":3,"id":"cr","fields":{"name_full":{"synonym":"Наименование валюты","multiline_mode":false,"tooltip":"Полное наименование валюты","mandatory":true,"type":{"types":["string"],"str_len":50}},"extra_charge":{"synonym":"Наценка","multiline_mode":false,"tooltip":"Коэффициент, который применяется к курсу основной валюты для вычисления курса текущей валюты.","type":{"types":["number"],"digits":10,"fraction":2}},"main_currency":{"synonym":"Основная валюта","multiline_mode":false,"tooltip":"Валюта, на основании курса которой рассчитывается курс текущей валюты","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.currencies"],"is_ref":true}},"parameters_russian_recipe":{"synonym":"Параметры прописи на русском","multiline_mode":false,"tooltip":"Параметры прописи валюты на русском языке","type":{"types":["string"],"str_len":200}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}}},"tabular_sections":{},"cachable":"ram"},"property_values":{"name":"ЗначенияСвойствОбъектов","splitted":false,"synonym":"Дополнительные значения","illustration":"","obj_presentation":"Дополнительное значение","list_presentation":"","input_by_string":["name"],"hierarchical":true,"has_owners":true,"group_hierarchy":true,"main_presentation_name":"name","code_length":0,"id":"v","fields":{"heft":{"synonym":"Весовой коэффициент","multiline_mode":false,"tooltip":"Относительный вес дополнительного значения (значимость).","type":{"types":["number"],"digits":10,"fraction":2}},"full_name":{"synonym":"Полное наименование","multiline_mode":true,"tooltip":"Подробное описание значения дополнительного реквизита","type":{"types":["string"],"str_len":0}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"editor":{"synonym":"Редактор","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.users","cat.accounts"],"is_ref":true}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"owner":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит или сведение.","mandatory":true,"type":{"types":["cch.properties"],"is_ref":true}},"parent":{"synonym":"Входит в группу","multiline_mode":false,"tooltip":"Группа дополнительных значений свойства.","choice_links":[{"name":["selection","owner"],"path":["owner"]}],"type":{"types":["cat.property_values"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram"},"accounts":{"name":"ИнтеграцияПользователи","splitted":false,"synonym":"Пользователи сервиса","illustration":"","obj_presentation":"Пользователь сервиса","list_presentation":"","input_by_string":[],"hierarchical":false,"has_owners":true,"group_hierarchy":true,"main_presentation_name":"name","code_length":0,"id":"a","fields":{"prefix":{"synonym":"Префикс нумерации","multiline_mode":false,"tooltip":"Префикс номеров документов текущего пользователя","mandatory":true,"type":{"types":["string"],"str_len":2}},"push_only":{"synonym":"Только push","multiline_mode":false,"tooltip":"Для пользователя установлен режим push-only (изменения мигрируют в одну сторону - от пользователя на сервер)","type":{"types":["boolean"]}},"subscription":{"synonym":"Подписан на рассылку","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"ips":{"synonym":"IP-адреса входа","multiline_mode":false,"tooltip":"Список ip-адресов с маской через запятую, с которых разрешена авторизация\n192.168.9.0/24, 192.168.21.*","type":{"types":["string"],"str_len":0}},"suffix":{"synonym":"Суффикс CouchDB","multiline_mode":false,"tooltip":"Для разделения данных в CouchDB","mandatory":true,"type":{"types":["string"],"str_len":4}},"direct":{"synonym":"Direct","multiline_mode":false,"tooltip":"Для пользователя запрещен режим offline","type":{"types":["boolean"]}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"owner":{"synonym":"Пользователь 1С","multiline_mode":false,"tooltip":"Ссылка на стандартного пользователя","type":{"types":["cat.users"],"is_ref":true}}},"tabular_sections":{"acl_objs":{"name":"ОбъектыДоступа","synonym":"Объекты доступа","tooltip":"","fields":{"obj":{"synonym":"Объект","multiline_mode":false,"tooltip":"","type":{"types":["cat.individuals","cat.partners","string","cat.organizations","number","cat.users"],"is_ref":true,"str_len":10,"digits":10,"fraction":0}},"by_default":{"synonym":"По умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}}},"subscribers":{"name":"Абоненты","synonym":"Абоненты","tooltip":"","fields":{"abonent":{"synonym":"Абонент","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.abonents"],"is_ref":true}},"branch":{"synonym":"Отдел","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["subscribers","abonent"]}],"choice_groups_elm":"elm","type":{"types":["cat.branches"],"is_ref":true}},"roles":{"synonym":"Роли Couchdb","multiline_mode":false,"tooltip":"","type":{"types":["json"]}}}},"ids":{"name":"Идентификаторы","synonym":"Идентификаторы авторизации","tooltip":"","fields":{"identifier":{"synonym":"Идентификатор","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["string"],"str_len":255}},"server":{"synonym":"Сервер","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.servers"],"is_ref":true}},"password_hash":{"synonym":"password_scheme","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":1000}}}}},"cachable":"ram"},"partners":{"name":"Контрагенты","splitted":false,"synonym":"Контрагенты","illustration":"Список юридических или физических лиц клиентов (поставщиков, покупателей).","obj_presentation":"Контрагент","list_presentation":"Контрагенты","input_by_string":["name","id","inn"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":"name","code_length":9,"id":"pt","fields":{"name_full":{"synonym":"Полное наименование","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"note":{"synonym":"Комментарий","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"inn":{"synonym":"ИНН","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":12}},"kpp":{"synonym":"КПП","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":9}},"ogrn":{"synonym":"ОГРН","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":15}},"okpo":{"synonym":"Код по ОКПО","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":10}},"individual_legal":{"synonym":"Юр. / физ. лицо","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["enm.individual_legal"],"is_ref":true}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"Группа контрагентов","multiline_mode":false,"tooltip":"","type":{"types":["cat.partners"],"is_ref":true}}},"tabular_sections":{"contact_information":{"name":"КонтактнаяИнформация","synonym":"Контактная информация","tooltip":"","fields":{"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"Тип контактной информации (телефон, адрес и т.п.)","choice_groups_elm":"elm","type":{"types":["enm.contact_information_types"],"is_ref":true}},"kind":{"synonym":"Вид","multiline_mode":false,"tooltip":"Вид контактной информации","choice_params":[{"name":"parent","path":null}],"choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}},"presentation":{"synonym":"Представление","multiline_mode":false,"tooltip":"Представление контактной информации для отображения в формах","type":{"types":["string"],"str_len":500}},"values_fields":{"synonym":"Значения полей","multiline_mode":false,"tooltip":"Служебное поле, для хранения контактной информации","type":{"types":["string"],"str_len":0},"hide":true},"country":{"synonym":"Страна","multiline_mode":false,"tooltip":"Страна (заполняется для адреса)","type":{"types":["string"],"str_len":100},"hide":true},"region":{"synonym":"Регион","multiline_mode":false,"tooltip":"Регион (заполняется для адреса)","type":{"types":["string"],"str_len":50},"hide":true},"city":{"synonym":"Город","multiline_mode":false,"tooltip":"Город (заполняется для адреса)","type":{"types":["string"],"str_len":50},"hide":true},"email_address":{"synonym":"Адрес ЭП","multiline_mode":false,"tooltip":"Адрес электронной почты","type":{"types":["string"],"str_len":100},"hide":true},"server_domain_name":{"synonym":"Доменное имя сервера","multiline_mode":false,"tooltip":"Доменное имя сервера электронной почты или веб-страницы","type":{"types":["string"],"str_len":100},"hide":true},"phone_number":{"synonym":"Номер телефона","multiline_mode":false,"tooltip":"Полный номер телефона","type":{"types":["string"],"str_len":20},"hide":true},"phone_without_codes":{"synonym":"Номер телефона без кодов","multiline_mode":false,"tooltip":"Номер телефона без кодов и добавочного номера","type":{"types":["string"],"str_len":20},"hide":true}}},"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.property_values_hierarchy","boolean","cat.property_values","string","date","number","cat.users"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0},"hide":true}}}},"cachable":"ram"},"destinations":{"name":"НаборыДополнительныхРеквизитовИСведений","splitted":false,"synonym":"Наборы дополнительных реквизитов и сведений","illustration":"","obj_presentation":"Набор дополнительных реквизитов и сведений","list_presentation":"","input_by_string":["name"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":"name","code_length":0,"id":"ds","fields":{"used":{"synonym":"Используется","multiline_mode":false,"tooltip":"Набор свойств отображается в форме списка","type":{"types":["boolean"]}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"Входит в группу","multiline_mode":false,"tooltip":"Группа, к которой относится набор.","type":{"types":["cat.destinations"],"is_ref":true}}},"tabular_sections":{"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"","fields":{"property":{"synonym":"Дополнительный реквизит","multiline_mode":false,"tooltip":"Дополнительный реквизит этого набора","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"_deleted":{"synonym":"Пометка удаления","multiline_mode":false,"tooltip":"Устанавливается при исключении дополнительного реквизита из набора,\nчтобы можно было вернуть связь с уникальным дополнительным реквизитом.","type":{"types":["boolean"]}}}},"extra_properties":{"name":"ДополнительныеСведения","synonym":"Дополнительные сведения","tooltip":"","fields":{"property":{"synonym":"Дополнительное сведение","multiline_mode":false,"tooltip":"Дополнительное сведение этого набора","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"_deleted":{"synonym":"Пометка удаления","multiline_mode":false,"tooltip":"Устанавливается при исключении дополнительного сведения из набора,\nчтобы можно было вернуть связь с уникальным дополнительным сведением.","type":{"types":["boolean"]}}}}},"cachable":"ram"},"nom":{"name":"Номенклатура","splitted":false,"synonym":"Номенклатура","illustration":"Перечень товаров, продукции, материалов, полуфабрикатов, тары, услуг","obj_presentation":"Позиция номенклатуры","list_presentation":"","input_by_string":["name","id","article"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":"name","code_length":11,"id":"n","fields":{"article":{"synonym":"Артикул ","multiline_mode":false,"tooltip":"Артикул номенклатуры.","type":{"types":["string"],"str_len":25}},"nom_kind":{"synonym":"Вид номенклатуры","multiline_mode":false,"tooltip":"Указывается вид, к которому следует отнести данную позицию номенклатуры.","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.ВидыНоменклатуры"],"is_ref":true}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"editor":{"synonym":"Редактор","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.users","cat.accounts"],"is_ref":true}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"Группа","multiline_mode":false,"tooltip":"Группа, в которую входит данная позиция номенклатуры.","type":{"types":["cat.nom"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram"},"organizations":{"name":"Организации","splitted":false,"synonym":"Организации","illustration":"","obj_presentation":"Организация","list_presentation":"","input_by_string":["name","id"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":"name","code_length":11,"id":"og","fields":{"prefix":{"synonym":"Префикс","multiline_mode":false,"tooltip":"Используется при нумерации документов. В начало каждого номера документов данной организации добавляется символы префикса.","type":{"types":["string"],"str_len":3}},"individual_legal":{"synonym":"Юр. / физ. лицо","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["enm.individual_legal"],"is_ref":true}},"inn":{"synonym":"ИНН","multiline_mode":false,"tooltip":"Идентификационный номер налогоплательщика","type":{"types":["string"],"str_len":12}},"kpp":{"synonym":"КПП","multiline_mode":false,"tooltip":"Код причины постановки на учет","type":{"types":["string"],"str_len":9}},"ogrn":{"synonym":"ОГРН","multiline_mode":false,"tooltip":"Основной государственный регистрационный номер","type":{"types":["string"],"str_len":15}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cat.organizations"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram"},"users":{"name":"Пользователи","splitted":false,"synonym":"Пользователи","illustration":"","obj_presentation":"Пользователь","list_presentation":"","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":"name","code_length":0,"id":"u","fields":{"invalid":{"synonym":"Недействителен","multiline_mode":false,"tooltip":"Пользователь больше не работает в программе, но сведения о нем сохранены.\nНедействительные пользователи скрываются из всех списков\nпри выборе или подборе в документах и других местах программы.","type":{"types":["boolean"]}},"note":{"synonym":"Комментарий","multiline_mode":true,"tooltip":"Произвольная строка","type":{"types":["string"],"str_len":0}},"ancillary":{"synonym":"Служебный","multiline_mode":false,"tooltip":"Неразделенный или разделенный служебный пользователь, права к которому устанавливаются непосредственно и программно.","type":{"types":["boolean"]}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}}},"tabular_sections":{"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"Дополнительные реквизиты объекта","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.property_values_hierarchy","boolean","cat.property_values","string","date","number","cat.users"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0}}}},"contact_information":{"name":"КонтактнаяИнформация","synonym":"Контактная информация","tooltip":"Хранение контактной информации (адреса, веб-страницы, номера телефонов и др.)","fields":{"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"Тип контактной информации (телефон, адрес и т.п.)","choice_groups_elm":"elm","type":{"types":["enm.contact_information_types"],"is_ref":true}},"kind":{"synonym":"Вид","multiline_mode":false,"tooltip":"Вид контактной информации","choice_params":[{"name":"parent","path":"2d084a4c-55b8-11e6-82b8-d85d4c80ec2a"}],"choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}},"presentation":{"synonym":"Представление","multiline_mode":false,"tooltip":"Представление контактной информации для отображения в формах","type":{"types":["string"],"str_len":500}},"values_fields":{"synonym":"Значения полей","multiline_mode":false,"tooltip":"Служебное поле, для хранения контактной информации","type":{"types":["string"],"str_len":0}},"country":{"synonym":"Страна","multiline_mode":false,"tooltip":"Страна (заполняется для адреса)","type":{"types":["string"],"str_len":100}},"region":{"synonym":"Регион","multiline_mode":false,"tooltip":"Регион (заполняется для адреса)","type":{"types":["string"],"str_len":50}},"city":{"synonym":"Город","multiline_mode":false,"tooltip":"Город (заполняется для адреса)","type":{"types":["string"],"str_len":50}},"email_address":{"synonym":"Адрес ЭП","multiline_mode":false,"tooltip":"Адрес электронной почты","type":{"types":["string"],"str_len":100}},"server_domain_name":{"synonym":"Доменное имя сервера","multiline_mode":false,"tooltip":"Доменное имя сервера электронной почты или веб-страницы","type":{"types":["string"],"str_len":100}},"phone_number":{"synonym":"Номер телефона","multiline_mode":false,"tooltip":"Полный номер телефона","type":{"types":["string"],"str_len":20}},"phone_without_codes":{"synonym":"Номер телефона без кодов","multiline_mode":false,"tooltip":"Номер телефона без кодов и добавочного номера","type":{"types":["string"],"str_len":20}},"list_view":{"synonym":"Вид для списка","multiline_mode":false,"tooltip":"Вид контактной информации для списка","choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}}}}},"cachable":"ram"},"articles":{"name":"Статьи","splitted":false,"synonym":"Статьи","illustration":"Основной объект CMS. Новости и файлы - это тоже статьи","obj_presentation":"","list_presentation":"","input_by_string":["name","id"],"hierarchical":true,"has_owners":false,"group_hierarchy":false,"main_presentation_name":"name","code_length":50,"id":"at","fields":{"h1":{"synonym":"H1","multiline_mode":false,"tooltip":"Заголовок в теле статьи","type":{"types":["string"],"str_len":255}},"descr":{"synonym":"Description","multiline_mode":true,"tooltip":"Краткое содержание для SEO","type":{"types":["string"],"str_len":255}},"introduction":{"synonym":"Introduction","multiline_mode":true,"tooltip":"Вводный текст","type":{"types":["string"],"str_len":0}},"content":{"synonym":"Content","multiline_mode":true,"tooltip":"Текст статьи","type":{"types":["string"],"str_len":0}},"img":{"synonym":"Картинка","multiline_mode":false,"tooltip":"Картинка статьи для SEO","type":{"types":["string"],"str_len":255}},"date":{"synonym":"Дата","multiline_mode":false,"tooltip":"Дата создания материала","mandatory":true,"type":{"types":["date"],"date_part":"date_time"}},"author":{"synonym":"Автор","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.users","cat.accounts"],"is_ref":true}},"sorting_field":{"synonym":"Порядок","multiline_mode":false,"tooltip":"Используется для упорядочивания (служебный)","type":{"types":["number"],"digits":6,"fraction":0}},"published":{"synonym":"Опубликован","multiline_mode":false,"tooltip":"Показывать на сайте","type":{"types":["boolean"]}},"formula":{"synonym":"Формула","multiline_mode":false,"tooltip":"Компонент react для рендера содержимого статьи","choice_params":[{"name":"parent","path":"713968e2-2d2b-11ed-b994-7085c299da15"}],"choice_groups_elm":"elm","type":{"types":["cat.formulas"],"is_ref":true}},"category":{"synonym":"Категория","multiline_mode":false,"tooltip":"Статья, Файл, Новость, Оглавление, Меню","choice_groups_elm":"elm","mandatory":true,"type":{"types":["enm.tags_category"],"is_ref":true}},"footer":{"synonym":"Показывать подвал","multiline_mode":false,"tooltip":"Показывать стандартный подвал после статьи","type":{"types":["boolean"]}},"social":{"synonym":"Кнопки \"поделиться\"","multiline_mode":false,"tooltip":"Показывать кнопки \"поделиться\" после статьи","type":{"types":["boolean"]}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cat.articles"],"is_ref":true}}},"tabular_sections":{"tags":{"name":"Теги","synonym":"Теги","tooltip":"Произвольные ярлыки","fields":{"tag":{"synonym":"Тег (категория)","multiline_mode":false,"tooltip":"","choice_params":[{"name":"category","path":[null,null,null]}],"choice_groups_elm":"elm","type":{"types":["cat.tags"],"is_ref":true}}}},"articles":{"name":"Статьи","synonym":"Статьи","tooltip":"","fields":{"paper":{"synonym":"Статья","multiline_mode":false,"tooltip":"","choice_params":[{"name":"category","path":["news","article","file","contents"]}],"choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.articles"],"is_ref":true}}}},"aliases":{"name":"aliases","synonym":"Псевдонимы url","tooltip":"","fields":{"url":{"synonym":"Псевдоним Url","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":250}}}},"acl":{"name":"acl","synonym":"Права","tooltip":"","fields":{"role":{"synonym":"role","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":25}},"w":{"synonym":"w","multiline_mode":false,"tooltip":"Резрешена запись объекта","type":{"types":["boolean"]}}}},"acl_att":{"name":"acl_att","synonym":"Права вложений","tooltip":"","fields":{"name":{"synonym":"Файл","multiline_mode":false,"tooltip":"Имя файла","type":{"types":["string"],"str_len":255}},"role":{"synonym":"role","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":25}},"w":{"synonym":"w","multiline_mode":false,"tooltip":"Резрешена запись объекта","type":{"types":["boolean"]}}}}},"cachable":"ram"},"tags":{"name":"Теги","splitted":false,"synonym":"Теги","illustration":"","obj_presentation":"Тег","list_presentation":"","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":"name","code_length":0,"id":"tg","fields":{"synonym":{"synonym":"Синоним","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":255}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}}},"tabular_sections":{},"cachable":"ram"},"nom_prices_types":{"name":"ТипыЦенНоменклатуры","splitted":false,"synonym":"Типы цен номенклатуры","illustration":"Перечень типов отпускных цен предприятия","obj_presentation":"Тип цен номенклатуры","list_presentation":"Типы цен номенклатуры","input_by_string":["name","id"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":"name","code_length":9,"id":"pt","fields":{"price_currency":{"synonym":"Валюта цены по умолчанию","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.currencies"],"is_ref":true}},"discount_percent":{"synonym":"Процент скидки или наценки по умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":5,"fraction":2}},"vat_price_included":{"synonym":"Цена включает НДС","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"rounding_order":{"synonym":"Порядок округления","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":10}},"rounding_in_a_big_way":{"synonym":"Округлять в большую сторону","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"note":{"synonym":"Комментарий","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}}},"tabular_sections":{},"cachable":"ram"},"formulas":{"name":"Формулы","splitted":false,"synonym":"Формулы","illustration":"Формулы пользователя, для выполнения при расчете спецификаций, модификаторы, вычисляемые свойства","obj_presentation":"Формула","list_presentation":"","input_by_string":["name"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":"name","code_length":0,"id":"f","fields":{"formula":{"synonym":"Формула","multiline_mode":false,"tooltip":"Текст функции на языке javascript","type":{"types":["string"],"str_len":0}},"leading_formula":{"synonym":"Ведущая формула","multiline_mode":false,"tooltip":"Если указано, выполняется код ведущей формулы с параметрами, заданными для текущей формулы","choice_params":[{"name":"leading_formula","path":"00000000-0000-0000-0000-000000000000"}],"choice_groups_elm":"elm","type":{"types":["cat.formulas"],"is_ref":true}},"condition_formula":{"synonym":"Это формула условия","multiline_mode":false,"tooltip":"Формула используется, как фильтр, а не как алгоритм расчета количества.\nЕсли возвращает не Истина, строка в спецификацию не добавляется","type":{"types":["boolean"]}},"definition":{"synonym":"Описание","multiline_mode":true,"tooltip":"Описание в формате html","type":{"types":["string"],"str_len":0}},"template":{"synonym":"Шаблон","multiline_mode":true,"tooltip":"html или jsx шаблон отчета","type":{"types":["string"],"str_len":0}},"sorting_field":{"synonym":"Порядок","multiline_mode":false,"tooltip":"Используется для упорядочивания (служебный)","type":{"types":["number"],"digits":6,"fraction":0}},"async":{"synonym":"Асинхронный режим","multiline_mode":false,"tooltip":"Создавать асинхронную функцию","type":{"types":["boolean"]}},"disabled":{"synonym":"Отключена","multiline_mode":false,"tooltip":"Имеет смысл только для печатных форм и модификаторов","type":{"types":["boolean"]}},"context":{"synonym":"Контекст","multiline_mode":false,"tooltip":"Выполнять в браузере, node или везде","max":2,"min":0,"type":{"types":["number"],"digits":6,"fraction":0}},"jsx":{"synonym":"JSX","multiline_mode":false,"tooltip":"Транспилировать формулу из шаблона jsx","type":{"types":["boolean"]}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"editor":{"synonym":"Редактор","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.users","cat.accounts"],"is_ref":true}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"Группа","multiline_mode":false,"tooltip":"Группа формул","mandatory":true,"type":{"types":["cat.formulas"],"is_ref":true}}},"tabular_sections":{"params":{"name":"Параметры","synonym":"Параметры","tooltip":"","fields":{"param":{"synonym":"Параметр","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.property_values_hierarchy","boolean","cat.property_values","string","date","number","cat.users"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["params","param"]}],"type":{"types":["cat.property_values_hierarchy","boolean","cat.property_values","string","date","number","cat.users"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}}}}},"cachable":"ram"},"characteristics":{"name":"ХарактеристикиНоменклатуры","splitted":false,"synonym":"Характеристики номенклатуры","illustration":"Дополнительные характеристики элементов номенклатуры: цвет, размер и т.п.","obj_presentation":"Характеристика номенклатуры","list_presentation":"Характеристики номенклатуры","input_by_string":["name"],"hierarchical":false,"has_owners":true,"group_hierarchy":true,"main_presentation_name":"name","code_length":0,"id":"cx","fields":{"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"owner":{"synonym":"Номенклатура","multiline_mode":false,"tooltip":"Характеристика может быть подчинена, кроме {@link CatNom|Номенклатуры), элементам справочника {@link CatNom_kinds|ВидыНоменклатуры}, что экономило бы ссылки (одну характеристику на несколько номенклатур), но в сейчас это не используется","mandatory":true,"type":{"types":["cat.ВидыНоменклатуры","cat.nom"],"is_ref":true}}},"tabular_sections":{},"hashable":true,"cachable":"ram"}},"doc":{"work_centers_task":{"name":"НарядРЦ","splitted":false,"synonym":"Задание рабочему центру","illustration":"","obj_presentation":"Наряд","list_presentation":"Задания рабочим центрам","input_by_string":["number_doc"],"main_presentation_name":"name","code_length":11,"id":"wt","fields":{},"tabular_sections":{"cuts":{"name":"Обрезь","synonym":"Обрезь","tooltip":"Приход и расход деловой обрези","fields":{"record_kind":{"synonym":"Вид движения","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","mandatory":true,"type":{"types":["enm.debit_credit_kinds"],"is_ref":true}},"stick":{"synonym":"№ хлыста","multiline_mode":false,"tooltip":"№ листа (хлыста, заготовки)","type":{"types":["number"],"digits":6,"fraction":0}},"pair":{"synonym":"№ пары","multiline_mode":false,"tooltip":"№ парной заготовки","type":{"types":["number"],"digits":6,"fraction":0}},"nom":{"synonym":"Номенклатура","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.nom"],"is_ref":true}},"characteristic":{"synonym":"Характеристика","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["cuts","nom"]}],"choice_groups_elm":"elm","type":{"types":["cat.characteristics","string"],"is_ref":true,"str_len":72,"str_fix":true,"default":"cat.characteristics"}},"len":{"synonym":"Длина, высота","multiline_mode":false,"tooltip":"размер в мм","type":{"types":["number"],"digits":8,"fraction":2}},"width":{"synonym":"Ширина","multiline_mode":false,"tooltip":"ширина в мм","type":{"types":["number"],"digits":8,"fraction":2}},"used":{"synonym":"Использовано","multiline_mode":false,"tooltip":"длина в мм","type":{"types":["number"],"digits":8,"fraction":2}},"x":{"synonym":"Координата X","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":8,"fraction":2}},"y":{"synonym":"Координата Y","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":8,"fraction":2}},"quantity":{"synonym":"Количество","multiline_mode":false,"tooltip":"Количество в единицах хранения","type":{"types":["number"],"digits":8,"fraction":2}},"cell":{"synonym":"Ячейка","multiline_mode":false,"tooltip":"№ ячейки (откуда брать заготовку или куда помещать деловой обрезок)","type":{"types":["string"],"str_len":9}},"dop":{"synonym":"Допреквизиты и параметры","multiline_mode":false,"tooltip":"","type":{"types":["json"]}}}},"cutting":{"name":"Раскрой","synonym":"Раскрой","tooltip":"","fields":{"obj":{"synonym":"Объект","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":10}},"production":{"synonym":"Продукция","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.characteristics"],"is_ref":true}},"specimen":{"synonym":"Экземпляр","multiline_mode":false,"tooltip":"Номер экземпляра","type":{"types":["number"],"digits":6,"fraction":0}},"elm":{"synonym":"Элемент","multiline_mode":false,"tooltip":"Номер элемента","type":{"types":["number"],"digits":6,"fraction":0}},"nom":{"synonym":"Номенклатура","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.nom"],"is_ref":true}},"characteristic":{"synonym":"Характеристика","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["cutting","nom"]}],"choice_groups_elm":"elm","type":{"types":["cat.characteristics","string"],"is_ref":true,"str_len":72,"str_fix":true,"default":"cat.characteristics"}},"len":{"synonym":"Длина","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":8,"fraction":2}},"width":{"synonym":"Ширина","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":6,"fraction":0}},"stick":{"synonym":"№ хлыста","multiline_mode":false,"tooltip":"№ листа (заготовки), на котором размещать изделие","type":{"types":["number"],"digits":6,"fraction":0}},"pair":{"synonym":"№ пары","multiline_mode":false,"tooltip":"№ парного изделия","type":{"types":["number"],"digits":6,"fraction":0}},"orientation":{"synonym":"Ориентация","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["enm.orientations"],"is_ref":true}},"elm_type":{"synonym":"Тип элемента","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["enm.elm_types"],"is_ref":true}},"alp1":{"synonym":"Угол реза1","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":8,"fraction":2}},"alp2":{"synonym":"Угол реза2","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":8,"fraction":2}},"cell":{"synonym":"Ячейка","multiline_mode":false,"tooltip":"№ ячейки (куда помещать изделие)","type":{"types":["string"],"str_len":9}},"part":{"synonym":"Партия","multiline_mode":false,"tooltip":"Партия (такт, группа раскроя)","type":{"types":["number"],"digits":6,"fraction":0}},"x":{"synonym":"Координата X","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":8,"fraction":2}},"y":{"synonym":"Y","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":8,"fraction":2}},"rotated":{"synonym":"Поворот","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"nonstandard":{"synonym":"Это нестандарт","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}}}},"cachable":"ram"}},"areg":{},"dp":{},"rep":{},"cch":{"properties":{"name":"ДополнительныеРеквизитыИСведения","splitted":false,"synonym":"Дополнительные реквизиты и сведения","illustration":"","obj_presentation":"Дополнительный реквизит / сведение","list_presentation":"","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":false,"main_presentation_name":"name","code_length":0,"id":"ex","fields":{"shown":{"synonym":"Виден","multiline_mode":false,"tooltip":"Настройка видимости дополнительного реквизита","type":{"types":["boolean"]}},"sorting_field":{"synonym":"Порядок","multiline_mode":false,"tooltip":"Используется для упорядочивания (служебный)","type":{"types":["number"],"digits":6,"fraction":0}},"extra_values_owner":{"synonym":"Владелец дополнительных значений","multiline_mode":false,"tooltip":"Свойство-образец, с которым у этого свойства одинаковый список дополнительных значений","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"available":{"synonym":"Доступен","multiline_mode":false,"tooltip":"Настройка доступности дополнительного реквизита","type":{"types":["boolean"]}},"mandatory":{"synonym":"Заполнять обязательно","multiline_mode":false,"tooltip":"Настройка проверки заполненности дополнительного реквизита","type":{"types":["boolean"]}},"include_to_name":{"synonym":"Включать в наименование","multiline_mode":false,"tooltip":"Добавлять значение параметра в наименование продукции","type":{"types":["boolean"]}},"list":{"synonym":"Список","multiline_mode":false,"tooltip":"Реквизит подсистемы интеграции metadata.js - реализует функциональность списка опций","type":{"types":["number"],"digits":1,"fraction":0}},"note":{"synonym":"Комментарий","multiline_mode":false,"tooltip":"Поясняет назначение свойства","type":{"types":["string"],"str_len":0}},"destination":{"synonym":"Набор свойств","multiline_mode":false,"tooltip":"Набор свойств, которому принадлежит уникальное свойство. Если не задан, значит свойство общее.","choice_groups_elm":"elm","type":{"types":["cat.destinations"],"is_ref":true}},"tooltip":{"synonym":"Подсказка","multiline_mode":false,"tooltip":"Показывается пользователю при редактировании свойства в форме объекта","type":{"types":["string"],"str_len":0}},"caption":{"synonym":"Наименование","multiline_mode":false,"tooltip":"Краткое представление свойства, которое\nвыводится в формах редактирования его значения","mandatory":true,"type":{"types":["string"],"str_len":75}},"is_extra_property":{"synonym":"Это дополнительное сведение","multiline_mode":false,"tooltip":"Свойство является дополнительным сведением, а не дополнительным реквизитом","type":{"types":["boolean"]}},"include_to_description":{"synonym":"Включать в описание","multiline_mode":false,"tooltip":"Добавлять имя и значение параметра в строку описания продукции","type":{"types":["boolean"]}},"calculated":{"synonym":"Вычисляемый","multiline_mode":false,"tooltip":"Если параметр вычисляемый, здесь указываем формулу","choice_groups_elm":"elm","type":{"types":["cat.formulas"],"is_ref":true}},"showcalc":{"synonym":"Показывать вычисляемый","multiline_mode":false,"tooltip":"Показывать параметр в списках свойств объекта ","type":{"types":["boolean"]}},"synonym":{"synonym":"Синоним","multiline_mode":false,"tooltip":"Синоним предопределенного элемента для javascript","type":{"types":["string"],"str_len":50}},"inheritance":{"synonym":"Наследование","multiline_mode":false,"tooltip":"Правило уточнения значений свойства","type":{"types":["number"],"digits":6,"fraction":0}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"editor":{"synonym":"Редактор","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.users","cat.accounts"],"is_ref":true}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"type":{"synonym":"","multiline_mode":false,"tooltip":"Типы значения, которое можно ввести при заполнении свойства.","mandatory":true,"type":{"types":["cat.property_values_hierarchy","boolean","cat.property_values","string","date","number","cat.users"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}}},"tabular_sections":{"use":{"name":"use","synonym":"Использование","tooltip":"","fields":{"count_calc_method":{"synonym":"Расчет колич.","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":10}}}},"hide":{"name":"Скрыть","synonym":"Скрыть","tooltip":"","fields":{"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["ref"]}],"choice_groups_elm":"elm","choice_type":{"path":["ТипЗначения"],"elm":0},"type":{"types":["cat.property_values_hierarchy","boolean","cat.property_values","string","date","number","cat.users"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}}}}},"mainPresentation":"name","cachable":"ram"},"predefined_elmnts":{"name":"ПредопределенныеЭлементы","splitted":false,"synonym":"Константы и списки","illustration":"Хранит значения настроек и параметров подсистем","obj_presentation":"Значение настроек","list_presentation":"","input_by_string":["name","synonym"],"hierarchical":true,"has_owners":false,"group_hierarchy":false,"main_presentation_name":"name","code_length":0,"id":"pd","fields":{"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"","choice_type":{"path":["ТипЗначения"],"elm":0},"type":{"types":["cat.formulas","boolean","cch.properties","string","date","number"],"is_ref":true,"str_len":1024,"date_part":"date","digits":8,"fraction":1}},"definition":{"synonym":"Описание","multiline_mode":true,"tooltip":"","type":{"types":["string"],"str_len":0}},"synonym":{"synonym":"Синоним","multiline_mode":false,"tooltip":"Синоним предопределенного элемента латиницей для обращения из javascript","type":{"types":["string"],"str_len":50}},"list":{"synonym":"Список","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":1,"fraction":0}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"editor":{"synonym":"Редактор","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.users","cat.accounts"],"is_ref":true}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cch.predefined_elmnts"],"is_ref":true}},"type":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cat.formulas","boolean","cch.properties","string","date","number"],"is_ref":true,"str_len":1024,"date_part":"date","digits":8,"fraction":1}}},"tabular_sections":{"elmnts":{"name":"Элементы","synonym":"Элементы","tooltip":"","fields":{"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"","choice_type":{"path":["ТипЗначения"],"elm":0},"type":{"types":["cat.formulas","boolean","cch.properties","string","date","number"],"is_ref":true,"str_len":1024,"date_part":"date","digits":8,"fraction":1}},"elm":{"synonym":"Элемент","multiline_mode":false,"tooltip":"","type":{"types":["cat.formulas","boolean","cch.properties","string","date","number"],"is_ref":true,"str_len":1024,"date_part":"date","digits":8,"fraction":1}}}}},"mainPresentation":"name","cachable":"ram"}},"cacc":{},"bp":{},"tsk":{},"syns_1с":["Абонент","Абоненты","Автор","АдресЭП","Активность","Артикул","Баллы","БизнесПроцесс","Булево","Важно","Валюта","ВалютаЦены","Валюты","ВводПоСтроке","ВедущаяЗадача","ВедущаяФормула","Ведущий","ВерсияДанных","Вес","Вид","ВидДвижения","ВидДляСписка","Виден","ВидНоменклатуры","ВидОперации","ВидСравнения","ВидСчета","ВидыДвиженийПриходРасход","ВидыКонтактнойИнформации","ВидыПолейФормы","ВключатьВНаименование","ВключатьВОписание","Владелец","ВладелецДополнительныхЗначений","Владельцы","Внутренняя","ВремяИзменения","ВремяНачала","ВремяОкончания","ВремяСобытия","Всего","ВходящееИсходящееСобытие","ВыборГруппИЭлементов","Выполнено","Город","Готовность","ГрафикиРаботников","ГрафикРаботы","ДаНет","Данные","Дата","ДатаНачала","ДатаРождения","Действие","ДеловаяОбрезь","Длина","ДлинаКода","ДниНедели","ДокументУдостоверяющийЛичность","Долгота","Должность","ДолжностьРП","ДоменноеИмяСервера","Доп","ДополнительныеРеквизиты","ДополнительныеРеквизитыИСведения","ДополнительныеСведения","Доступен","Заголовок","Задача","Заказ","Закрыт","Запасы","ЗаписьЛУРВ","ЗаполнятьОбязательно","Значение","ЗначениеЗаполнения","Значения","ЗначенияПолей","ЗначенияПолейАдреса","ЗначенияСвойствОбъектов","ЗначенияСвойствОбъектовИерархия","Идентификатор","ИдентификаторПользователяИБ","Идентификаторы","ИдентификаторыОбъектовМетаданных","Иерархический","ИерархияГруппИЭлементов","Имя","ИмяПредопределенныхДанных","ИмяРП","Индекс","Инициатор","ИНН","ИнтеграцияАбоненты","ИнтеграцияВидыСравнений","ИнтеграцияОтделыАбонентов","ИнтеграцияПользователи","ИнтеграцияСерверы","ИнтеграцияСостоянияТранспорта","ИнтеграцияТипВыгрузки","ИнтеграцияТипКеширования","ИнтеграцияТипСвёртки","Исполнители","Исполнитель","Используется","История","КатегорииТегов","Категория","КлассыКатегорий","Ключ","КлючиПараметров","Код","КодАльфа2","КодАльфа3","КодИМНС","КодПоОКПО","Количество","Комментарии","Комментарий","КонецПериода","КонечныйОстаток","КонтактнаяИнформация","Контрагент","Контрагенты","КорректировкаРегистров","Коэффициент","КПП","Кратность","КратностьВзаиморасчетов","Курс","КурсВзаиморасчетов","КурсыВалют","Марка","Масса","Менеджер","МестоРождения","МногострочныйРежим","Мощность","Набор","НаборСвойств","НаборыДополнительныхРеквизитовИСведений","Наименование","НаименованиеПолное","Направление","НаправленияСортировки","НарядРЦ","Наценка","НачалоПериода","НачальныйОстаток","Недействителен","Нестандарт","Номенклатура","Номер","НомерСтроки","НомерСчета","НомерТелефона","НомерТелефонаБезКодов","Область","Обрезь","Объект","ОбъектыДоступа","Объем","ОбязательноеЗаполнение","Оглавление","ОГРН","ОкруглятьВБольшуюСторону","Описание","Организации","Организация","Ориентация","ОриентацияЭлемента","Основание","ОснованиеРП","ОсновнаяВалюта","ОсновноеПредставлениеИмя","Отбор","Ответственный","Отдел","Отменено","Отправитель","ОтправленоНаДоработку","Отступы","Отчество","ОтчествоРП","Пара","Параметр","Параметры","ПараметрыВыбора","ПараметрыОтбора","ПараметрыПрописиНаРусском","Партия","Период","Периодичность","План","Планирование","Поворачивать","Поворот","Подразделение","Подразделения","Подсказка","Подчиненый","Покупатель","Пол","ПолноеИмя","ПолноеНаименование","ПоложенияЗаголовка","Получатель","ПолФизическихЛиц","Пользователи","ПометкаУдаления","Порядок","ПорядокОкругления","Поставщик","Поток","Потоки","ПоУмолчанию","Пояснение","ПредопределенныеЭлементы","Предопределенный","Представление","ПредставлениеИдентификатора","ПредставлениеОбъекта","ПредставлениеСписка","Префикс","Применение","ПримененияКлючейПараметров","Принудительно","Приоритет","Приход","Проведен","Продукция","Процент","ПроцентСкидкиНаценки","Прочее","Разделитель","Раскрой","Расход","РасширенныйРежим","Регион","Реквизит","РеквизитДопУпорядочивания","Реквизиты","Родитель","Роли","Свойство","Связи","СвязиПараметров","СвязиПараметровВыбора","СвязьПоТипу","Сделка","Сервер","Синоним","Скидка","Скрыть","Служебный","Событие","Содержание","Соответствие","Состояние","СостояниеТранспорта","Список","СпособРасчетаКоличества","СрокДействия","Срочно","Ссылка","СтандартныйПериод","Старт","Статьи","Статья","Стоимость","Страна","СтраныМира","СтраховойНомерПФР","Строка","Сумма","СуммаДокумента","Суффикс","СчетУчета","ТабличнаяЧасть","ТабличныеЧасти","Тег","Теги","ТекстоваяСтрока","Телефон","Телефоны","ТелефоныБанка","Тип","ТипСчета","ТипыКонтактнойИнформации","ТипыНоменклатуры","ТипыСобытий","ТипыСчетов","ТипыЦен","ТипыЦенНоменклатуры","ТипыЭлементов","ТипЭлемента","Товары","ТочкаМаршрута","УголРеза1","УголРеза2","Условие","Услуги","Фамилия","ФамилияРП","ФизическиеЛица","ФизическоеЛицо","Финиш","Формула","ФормулаУсловия","Формулы","Характеристика","ХарактеристикиНоменклатуры","Хлыст","Цена","ЦенаВключаетНДС","Число","Шаблон","Шаг","Ширина","Широта","Штуки","Экземпляр","Элемент","Элементы","ЭтоГруппа","ЭтоДополнительноеСведение","Эффективность","ЮрЛицо","ЮрФизЛицо","Ячейка"],"syns_js":["abonent","subscribers","author","email_address","activity","article","mark","buisness_process","boolean","important","currency","price_currency","currencies","input_by_string","leading_task","leading_formula","master","data_version","heft","kind","record_kind","list_view","shown","nom_kind","transactions_kind","comparison_type","account_kind","debit_credit_kinds","contact_information_kinds","data_field_kinds","include_to_name","include_to_description","owner","extra_values_owner","owners","internal","change_time","begin_time","end_time","event_time","altogether","inbound_outbound","choice_groups_elm","completed","city","readiness","workers_schedules","worker_schedule","yes_no","data","date","start_date","birth_date","action","biz_cuts","len","code_length","week_days","identification_document","longitude","position","positionR","server_domain_name","dop","extra_fields","properties","extra_properties","available","caption","issue","invoice","closed","inventories","workRecord","mandatory","value","fillValue","values","values_fields","address_fields","property_values","property_values_hierarchy","identifier","user_ib_uid","ids","meta_ids","hierarchical","group_hierarchy","moniker","predefined_name","monikerR","ind","initiator","inn","abonents","comparison_types","branches","accounts","servers","obj_delivery_states","unload_type","caching_type","reduce_type","executors","executor","used","history","tags_category","category","category_sections","key","parameters_keys","id","alpha2","alpha3","imns","okpo","quantity","notes","note","period_till","final_balance","contact_information","partner","partners","registers_correction","coefficient","kpp","multiplicity","settlements_multiplicity","course","settlements_course","currency_courses","brand","weight","manager","birth_place","multiline","performance","set","destination","destinations","name","name_full","direction","sort_directions","work_centers_task","extra_charge","period_from","initial_balance","invalid","nonstandard","nom","number_doc","row","account_number","phone_number","phone_without_codes","area","cuts","obj","acl_objs","volume","mandatory_fields","contents","ogrn","rounding_in_a_big_way","definition","organizations","organization","orientation","orientations","cause","causeR","main_currency","main_presentation_name","selection","responsible","branch","canceled","sender","specify","offsets","patronymic","patronymicR","pair","param","params","choice_params","selection_params","parameters_russian_recipe","part","period","periodicity","plan","planning","rotate","rotated","department","divisions","tooltip","has_owners","is_buyer","sex","full_moniker","full_name","label_positions","recipient","gender","users","_deleted","sorting","rounding_order","is_supplier","flow","flows","by_default","illustration","predefined_elmnts","predefined","presentation","identifier_presentation","obj_presentation","list_presentation","prefix","applying","parameters_keys_applying","forcibly","priority","debit","posted","production","rate","discount_percent","others","delimiter","cutting","credit","extended_mode","region","field","sorting_field","fields","parent","roles","property","links","params_links","choice_links","choice_type","trans","server","synonym","discount","hide","ancillary","event","content","conformity","state","obj_delivery_state","list","count_calc_method","validity","quickly","ref","standard_period","start","articles","paper","cost","country","countries","snils","string","amount","doc_amount","suffix","account_accounting","tabular_section","tabular_sections","tag","tags","txt_row","phone","phone_numbers","bank_phone_numbers","type","account_type","contact_information_types","nom_types","event_types","account_types","price_types","nom_prices_types","elm_types","elm_type","goods","buisness_process_point","alp1","alp2","condition","services","surname","surnameR","individuals","individual_person","finish","formula","condition_formula","formulas","characteristic","characteristics","stick","price","vat_price_included","number","template","step","width","latitude","is_pieces","specimen","elm","elmnts","is_folder","is_extra_property","efficiency","legal_person","individual_legal","cell"]});

(function(){
  const {MetaEventEmitter,EnumManager,CatManager,DocManager,DataProcessorsManager,ChartOfCharacteristicManager,ChartOfAccountManager,
    InfoRegManager,AccumRegManager,BusinessProcessManager,TaskManager,CatObj,DocObj,TabularSectionRow,DataProcessorObj,
    RegisterRow,BusinessProcessObj,TaskObj} = $p.constructor.classes;

  const _define = Object.defineProperties;

$p.enm.create('accumulation_record_type');
$p.enm.create('debit_credit_kinds');
$p.enm.create('tags_category');
$p.enm.create('category_sections');
$p.enm.create('orientations');
$p.enm.create('gender');
$p.enm.create('nom_types');
$p.enm.create('elm_types');
$p.enm.create('individual_legal');
class CchProperties extends CatObj{
get shown(){return this._getter('shown')}
set shown(v){this._setter('shown',v)}
get sorting_field(){return this._getter('sorting_field')}
set sorting_field(v){this._setter('sorting_field',v)}
get extra_values_owner(){return this._getter('extra_values_owner')}
set extra_values_owner(v){this._setter('extra_values_owner',v)}
get available(){return this._getter('available')}
set available(v){this._setter('available',v)}
get mandatory(){return this._getter('mandatory')}
set mandatory(v){this._setter('mandatory',v)}
get include_to_name(){return this._getter('include_to_name')}
set include_to_name(v){this._setter('include_to_name',v)}
get list(){return this._getter('list')}
set list(v){this._setter('list',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get destination(){return this._getter('destination')}
set destination(v){this._setter('destination',v)}
get tooltip(){return this._getter('tooltip')}
set tooltip(v){this._setter('tooltip',v)}
get caption(){return this._getter('caption')}
set caption(v){this._setter('caption',v)}
get is_extra_property(){return this._getter('is_extra_property')}
set is_extra_property(v){this._setter('is_extra_property',v)}
get include_to_description(){return this._getter('include_to_description')}
set include_to_description(v){this._setter('include_to_description',v)}
get calculated(){return this._getter('calculated')}
set calculated(v){this._setter('calculated',v)}
get showcalc(){return this._getter('showcalc')}
set showcalc(v){this._setter('showcalc',v)}
get synonym(){return this._getter('synonym')}
set synonym(v){this._setter('synonym',v)}
get inheritance(){return this._getter('inheritance')}
set inheritance(v){this._setter('inheritance',v)}
get captured(){return this._getter('captured')}
set captured(v){this._setter('captured',v)}
get editor(){return this._getter('editor')}
set editor(v){this._setter('editor',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get type(){const {type} = this._obj; return typeof type === 'object' ? type : {types: []}}
set type(v){this._obj.type = typeof v === 'object' ? v : {types: []}}
get use(){return this._getter_ts('use')}
set use(v){this._setter_ts('use',v)}
get hide(){return this._getter_ts('hide')}
set hide(v){this._setter_ts('hide',v)}


  /**
   * Является ли значение параметра вычисляемым
   *
   * @type Boolean
   */
  get is_calculated() {
    return ($p.job_prm.properties.calculated || []).includes(this) || !this.calculated.empty();
  }

  get show_calculated() {
    return ($p.job_prm.properties.show_calculated || []).includes(this) || this.showcalc;
  }

  /**
   * Рассчитывает значение вычисляемого параметра
   * @param obj {Object}
   * @param [obj.row]
   * @param [obj.elm]
   * @param [obj.ox]
   */
  calculated_value(obj) {
    if(!this._calculated_value) {
      if(this._formula) {
        this._calculated_value = $p.cat.formulas.get(this._formula);
      }
      else if(!this.calculated.empty()) {
        this._calculated_value = this.calculated;
      }
      else {
        return;
      }
    }
    return this._calculated_value.execute(obj);
  }

  /**
   * Проверяет условие в строке отбора
   */
  check_condition({row_spec, prm_row, elm, elm2, cnstr, origin, ox, calc_order, layer, calc_order_row}) {

    const {is_calculated, type} = this;
    const {utils, enm: {comparison_types, predefined_formulas}, EditorInvisible: {BuilderElement}} = $p;
    const ct = prm_row.comparison_type || comparison_types.eq;

    if(!layer) {
      if(elm instanceof BuilderElement) {
        layer = elm.layer;
      }
      else if(elm2 instanceof BuilderElement) {
        layer = elm2.layer;
      }
    }

    // для параметров алгоритма, фильтр отключаем
    if((prm_row.origin == 'algorithm') || (row_spec && row_spec.algorithm === predefined_formulas.clr_prm &&
      (ct.empty() || ct === comparison_types.eq) && type.types.includes('cat.clrs') && (!prm_row.value || prm_row.value.empty()))) {
      return true;
    }

    // значение параметра
    const val = is_calculated ? this.calculated_value({
      row: row_spec,
      cnstr: cnstr || 0,
      elm,
      elm2,
      ox,
      calc_order,
      prm_row,
      layer,
      calc_order_row,
    }) : this.extract_value(prm_row);

    let ok = false;

    // если сравнение на равенство - решаем в лоб, если вычисляемый параметр типа массив - выясняем вхождение значения в параметр
    if(ox && !Array.isArray(val) && (ct.empty() || ct === comparison_types.eq)) {
      if(is_calculated) {
        ok = val == prm_row.value;
      }
      else {
        const value = layer ? layer.extract_pvalue({param: this, cnstr, elm, origin, prm_row}) : this.extract_pvalue({ox, cnstr, elm, origin, prm_row});
        ok = value == val;
      }
    }
    // вычисляемый параметр - его значение уже рассчитано формулой (val) - сравниваем со значением в строке ограничений
    else if(is_calculated) {
      const value = this.extract_value(prm_row);
      ok = utils.check_compare(val, value, ct, comparison_types);
    }
    // параметр явно указан в табчасти параметров изделия
    else {
      const value = layer ? layer.extract_pvalue({param: this, cnstr, elm, origin, prm_row}) : this.extract_pvalue({ox, cnstr, elm, origin, prm_row});
      ok = (value !== undefined) && utils.check_compare(value, val, ct, comparison_types);
    }
    return ok;
  }

  /**
   * Извлекает значение из объекта (то, что будем сравнивать с extract_value)
   */
  extract_pvalue({ox, cnstr, elm = {}, origin, layer, prm_row}) {

    // для некоторых параметров, значения живут не в изделии, а в отделе абонента
    if(this.inheritance === 3) {
      return this.branch_value({project: elm.project, cnstr, ox});
    }

    let prow, cnstr0, elm0;
    const {product_params, params} = ox;
    const find_nearest = () => {
      if(cnstr && ox.constructions) {
        cnstr0 = cnstr;
        elm0 = elm;
        elm = {};
        const crow = ox.constructions.find({cnstr});
        crow && ox.constructions.find_rows({parent: crow.parent}, (row) => {
          if(row !== crow) {
            cnstr = row.cnstr;
            return false;
          }
        });
      }
    };
    if(params) {
      const {enm: {plan_detailing}, utils, CatInserts} = $p;
      let src = prm_row.origin;
      if(src === plan_detailing.algorithm) {
        src = plan_detailing.get();
      }
      if(src && !src.empty()) {
        switch (src) {
        case plan_detailing.order:
          const prow = ox.calc_order.extra_fields.find(this.ref, 'property');
          return prow && prow.value;

        case plan_detailing.nearest:
          find_nearest();
          break;

        case plan_detailing.layer_active:
          if(!layer) {
            layer = elm.layer;
          }
          if(layer && layer.furn.shtulp_kind() === 2) {
            find_nearest();
          }
          break;

        case plan_detailing.layer_passive:
          if(!layer) {
            layer = elm.layer;
          }
          if(layer && layer.furn.shtulp_kind() === 1) {
            find_nearest();
          }
          break;

        case plan_detailing.parent:
          if(cnstr && ox.constructions) {
            cnstr0 = cnstr;
            elm0 = elm;
            elm = {};
            const crow = ox.constructions.find({cnstr});
            const prow = ox.constructions.find({cnstr: crow.parent});
            if(crow) {
              cnstr = (prow && prow.parent === 0) ? 0 : crow.parent;
            }
          }
          break;

        case plan_detailing.product:
          if(cnstr) {
            cnstr0 = cnstr;
            elm0 = elm;
            cnstr = 0;
            elm = {};
          }
          break;

        case plan_detailing.elm:
        case plan_detailing.layer:
          break;

        default:
          throw `Источник '${src.name}' не поддержан`;
        }
      }
      const inset = (!src || src.empty()) ? ((origin instanceof CatInserts) ? origin : utils.blank.guid) : utils.blank.guid;
      const {rnum} = elm;
      if(rnum) {
        return elm[this.valueOf()];
      }
      else {
        params.find_rows({
          param: this,
          cnstr: cnstr || (elm._row ? {in: [0, -elm._row.elm]} : 0),
          inset,
        }, (row) => {
          if(!prow || row.cnstr) {
            prow = row;
          }
        });
      }
      if(!prow && (cnstr0 || elm0)) {
        params.find_rows({
          param: this,
          cnstr: cnstr0 || (elm0._row ? {in: [0, -elm0._row.elm]} : 0),
          inset,
        }, (row) => {
          if(!prow || row.cnstr) {
            prow = row;
          }
        });
      }
    }
    else if(product_params) {
      product_params.find_rows({
        elm: elm.elm || 0,
        param: this
      }, (row) => {
        prow = row;
        return false;
      });
    }
    return prow && prow.value;
  }

  /**
   * Извлекает значение из строки условия (то, с чем сравнивать extract_pvalue)
   */
  extract_value({comparison_type, txt_row, value}) {

    const {enm: {comparison_types}, md, cat} = $p;

    switch (comparison_type) {

    case comparison_types.in:
    case comparison_types.nin:

      if(value instanceof CatColor_price_groups) {
        return value.clrs();
      }
      else if(!txt_row) {
        return value;
      }
      try {
        const arr = JSON.parse(txt_row);
        const {types, is_ref} = this.type;
        if(types && is_ref && arr.length) {
          let mgr;
          for(const type of types) {
            const tmp = md.mgr_by_class_name(types[0]);
            if(tmp && arr.some(ref => tmp.by_ref[ref])) {
              mgr = tmp;
              break;
            }
          }
          if(!mgr) {
            return arr;
          }
          else if(mgr === cat.color_price_groups) {
            const res = [];
            for(const ref of arr) {
              const cg = mgr.get(ref, false);
              if(cg) {
                res.push(...cg.clrs());
              }
            }
            return res;
          }
          return arr.map((ref) => mgr.get(ref, false)).filter(v => v && !v.empty());
        }
        return arr;
      }
      catch (err) {
        return value;
      }

    default:
      return value;
    }
  }

  /**
   * Возвращает значение параметра с приведением типов
   * @param v
   */
  fetch_type(v) {
    const {type, _manager} = this;
    const {utils} = $p;
    if(type.is_ref) {

      if(type.digits && typeof v === 'number') {
        return v;
      }

      if(type.hasOwnProperty('str_len') && !utils.is_guid(v)) {
        return v;
      }

      const mgr = _manager.value_mgr({v}, 'v', type);
      if(mgr) {
        if(utils.is_data_mgr(mgr)) {
          return mgr.get(v, false, false);
        }
        else {
          return utils.fetch_type(v, mgr);
        }
      }

      if(v) {
        return null;
      }

    }
    else if(type.date_part) {
      return utils.fix_date(v, true);
    }
    else if(type.digits) {
      return utils.fix_number(v, !type.hasOwnProperty('str_len'));
    }
    else if(type.types[0] == 'boolean') {
      return utils.fix_boolean(v);
    }
    else if(type.types[0] == 'json') {
      return typeof v === 'object' ? v : {};
    }
    return v;
  }

  /**
   * Возвращает массив связей текущего параметра
   */
  params_links(attr) {

    // первым делом, выясняем, есть ли ограничитель на текущий параметр
    if(!this.hasOwnProperty('_params_links')) {
      this._params_links = $p.cat.params_links.find_rows({slave: this});
    }

    return this._params_links.filter((link) => {
      //use_master бывает 0 - один ведущий, 1 - несколько ведущих через И, 2 - несколько ведущих через ИЛИ
      const use_master = link.use_master || 0;
      let ok = true && use_master < 2;
      //в зависимости от use_master у нас массив либо из одного, либо из нескольких ключей ведущиъ для проверки
      const arr = !use_master ? [{key: link.master}] : link.leadings;

      arr.forEach((row_key) => {
        let ok_key = true;
        // для всех записей ключа параметров сначала строим Map ИЛИ
        const or = new Map();
        for(const row of row_key.key.params) {
          if(!or.has(row.area)) {
            or.set(row.area, []);
          }
          or.get(row.area).push(row);
        }
        for(const grp of or.values()) {
          let grp_ok = true;
          for(const row of grp) {
            // выполнение условия рассчитывает объект CchProperties
            grp_ok = row.property.check_condition({
              cnstr: attr.grid ? attr.grid.selection.cnstr : 0,
              ox: attr.obj._owner ? attr.obj._owner._owner : attr.obj.ox,
              prm_row: row,
              elm: attr.obj,
              layer: attr.layer,
            });
            // если строка условия в ключе не выполняется, то дальше проверять его условия смысла нет
            if (!grp_ok) {
              break;
            }
          }
          ok_key = grp_ok;
          if(ok_key) {
            break;
          }
        }

        //Для проверки через ИЛИ логика накопительная - надо проверить все ключи до единого
        if (use_master == 2){
          ok = ok || ok_key;
        }
        //Для проверки через И достаточно найти один неподходящий ключ, чтобы остановиться и признать связь неподходящей
        else if (!ok_key){
          ok = false;
          return false;
        }
      });
      //Конечный возврат в функцию фильтрации массива связей
      return ok;
    });
  }

  /**
   * Проверяет и при необходимости перезаполняет или устанваливает умолчание value в prow
   * @param links {Array}
   * @param [prow] {Object} - Eсли задан и текущее значение недопустимо, метод попытается установить корректное
   * @param [values] {Array} - Выходной параметр, если передать его снаружы, будет наполнен доступными значениями
   * @return {boolean}
   */
  linked_values(links, prow, values = []) {
    let changed;
    // собираем все доступные значения в одном массиве
    links.forEach((link) => link.append_values(values));
    // если значение доступно в списке - спокойно уходим
    const value = prow?.value;
    if(value instanceof CatClrs && value.is_composite()) {
      const {clr_in, clr_out} = value;
      if(!prow || (values.some(({_obj}) => _obj.value == clr_in) && values.some(({_obj}) => _obj.value == clr_out))) {
        return;
      }
    }
    else {
      if(!prow || values.some(({_obj}) => _obj.value == value)) {
        return;
      }
    }
    // если есть явный default - устанавливаем
    if(values.some((row) => {
      if(row.forcibly) {
        prow.value = row._obj.value;
        return true;
      }
      if(row.by_default && (!value || value.empty?.())) {
        prow.value = row._obj.value;
        changed = true;
      }
    })) {
      return true;
    }
    // если не нашли лучшего, установим первый попавшийся
    if(changed) {
      return true;
    }
    if(values.length) {
      prow.value = values[0]._obj.value;
      return true;
    }
  }

  /**
   * Значение, уточняемое отделом абонента
   * @param [project] {Scheme}
   * @param [cnstr] {Number}
   * @param [ox] {CatCharacteristics}
   */
  branch_value({project, cnstr = 0, ox}) {
    const branch = project ? project.branch : ox?.calc_order?.manager?.branch;
    let brow = branch && branch.extra_fields.find({property: this});
    if(brow) {
      return brow.value;
    }
    if(ox) {
      const {blank} = $p.utils;
      brow = ox.params.find({param: this, cnstr, inset: blank.guid});
      if(!brow && cnstr) {
        brow = ox.params.find({param: this, cnstr: 0, inset: blank.guid});
      }
    }
    return brow ? brow.value : this.fetch_type();
  }

  /**
   * Дополняет отбор фильтром по параметрам выбора,
   * используется в полях ввода экранных форм
   * @param filter {Object} - дополняемый фильтр
   * @param attr {Object} - атрибуты OCombo
   */
  filter_params_links(filter, attr, links) {
    // для всех отфильтрованных связей параметров
    if(!links) {
      links = this.params_links(attr);
    }
    links.forEach((link) => {
      // если ключ найден в параметрах, добавляем фильтр
      if(!filter.ref) {
        filter.ref = {in: []};
      }
      if(filter.ref.in) {
        link.append_values([]).forEach(({_obj}) => {
          if(!filter.ref.in.includes(_obj.value)) {
            filter.ref.in.push(_obj.value);
          }
        });
      }
    });
  }}
$p.CchProperties = CchProperties;
class CchPropertiesUseRow extends TabularSectionRow{
get count_calc_method(){return this._getter('count_calc_method')}
set count_calc_method(v){this._setter('count_calc_method',v)}
}
$p.CchPropertiesUseRow = CchPropertiesUseRow;
class CchPropertiesHideRow extends TabularSectionRow{
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
}
$p.CchPropertiesHideRow = CchPropertiesHideRow;
class CchPropertiesManager extends ChartOfCharacteristicManager {

  /**
   * Проверяет заполненность обязательных полей
   *
   * @override
   * @param prms {Array}
   * @param title {String}
   * @return {Boolean}
   */
  check_mandatory(prms, title) {

    let t, row;

    // проверяем заполненность полей
    for (t in prms) {
      row = prms[t];
      if(row.param.mandatory && (!row.value || row.value.empty())) {
        $p.msg.show_msg({
          type: 'alert-error',
          text: $p.msg.bld_empty_param + row.param.presentation,
          title: title || $p.msg.bld_title
        });
        return true;
      }
    }
  }

  /**
   * Возвращает массив доступных для данного свойства значений
   *
   * @override
   * @param prop {CatObj} - планвидовхарактеристик ссылка или объект
   * @param ret_mgr {Object} - установить в этом объекте указатель на менеджера объекта
   * @return {Array}
   */
  slist(prop, ret_mgr) {

    let res = [], rt, at, pmgr, op = this.get(prop);

    if(op && op.type.is_ref) {
      const tso = $p.enm.open_directions;

      // параметры получаем из локального кеша
      for (rt in op.type.types)
        if(op.type.types[rt].indexOf('.') > -1) {
          at = op.type.types[rt].split('.');
          pmgr = $p[at[0]][at[1]];
          if(pmgr) {

            if(ret_mgr) {
              ret_mgr.mgr = pmgr;
            }

            if(pmgr === tso) {
              pmgr.get_option_list().forEach((v) => v.value && v.value != tso.folding && res.push(v));
            }
            else if(pmgr.class_name.indexOf('enm.') != -1 || !pmgr.metadata().has_owners) {
              res = pmgr.get_option_list();
            }
            else {
              pmgr.find_rows({owner: prop}, (v) => res.push({value: v.ref, text: v.presentation}));
            }
          }
        }
    }
    return res;
  }

  load_array(aattr, forse) {
    super.load_array(aattr, forse);
    const {job_prm} = this._owner.$p;
    if(!job_prm.properties) {
      job_prm.__define('properties', {value: {}});
    }
    const parent = job_prm.properties;
    for (const row of aattr) {
      if(row.predefined_name) {
        parent.__define(row.predefined_name, {
          value: this.get(row, false, false),
          configurable: true,
          enumerable: true,
          writable: true,
        });
      }
    }
  }

}
$p.cch.create('properties', CchPropertiesManager, false);
class CchPredefined_elmnts extends CatObj{

  get value() {
    const {_obj, type, _manager} = this;
    const {utils} = _manager._owner.$p;
    const res = _obj ? _obj.value : '';

    if(_obj.is_folder) {
      return '';
    }
    if(typeof res == 'object') {
      return res;
    }
    else if(type.is_ref) {
      if(type.digits && typeof res === 'number') {
        return res;
      }
      if(type.hasOwnProperty('str_len') && !utils.is_guid(res)) {
        return res;
      }
      const mgr = _manager.value_mgr(_obj, 'value', type);
      if(mgr) {
        if(utils.is_data_mgr(mgr)) {
          return mgr.get(res, false);
        }
        else {
          return utils.fetch_type(res, mgr);
        }
      }
      if(res) {
        _manager._owner.$p.record_log(['value', type, _obj]);
        return null;
      }
    }
    else if(type.date_part) {
      return utils.fix_date(_obj.value, true);
    }
    else if(type.digits) {
      return utils.fix_number(_obj.value, !type.hasOwnProperty('str_len'));
    }
    else if(type.types[0] == 'boolean') {
      return utils.fix_boolean(_obj.value);
    }
    else {
      return _obj.value || '';
    }

    return this.characteristic.clr;
  }
  set value(v) {
    const {_obj, _data, _manager} = this;
    if(_obj.value !== v) {
      _manager.emit_async('update', this, {value: _obj.value});
      _obj.value = v.valueOf();
      _data._modified = true;
    }
  }
  get definition(){return this._getter('definition')}
  set definition(v){this._setter('definition',v)}
  get synonym(){return this._getter('synonym')}
  set synonym(v){this._setter('synonym',v)}
  get list(){return this._getter('list')}
  set list(v){this._setter('list',v)}
  get predefined_name(){return this._getter('predefined_name')}
  set predefined_name(v){this._setter('predefined_name',v)}
  get parent(){return this._getter('parent')}
  set parent(v){this._setter('parent',v)}
  get type(){const {type} = this._obj; return typeof type === 'object' ? type : {types: []}}
  set type(v){this._obj.type = typeof v === 'object' ? v : {types: []}}
  get elmnts(){return this._getter_ts('elmnts')}
  set elmnts(v){this._setter_ts('elmnts',v)}}
$p.CchPredefined_elmnts = CchPredefined_elmnts;
class CchPredefined_elmntsElmntsRow extends TabularSectionRow{
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get elm(){return this._getter('elm')}
set elm(v){this._setter('elm',v)}
}
$p.CchPredefined_elmntsElmntsRow = CchPredefined_elmntsElmntsRow;
class CchPredefined_elmntsManager extends ChartOfCharacteristicManager {

  constructor(owner, class_name) {
    super(owner, class_name);
    Object.defineProperty(this, 'parents', {
      value: {}
    });

    const {md, doc, adapters} = this._owner.$p;

    adapters.pouch.once('pouch_data_loaded', () => {
      // загружаем предопределенные элементы
      this.job_prms();
      // информируем мир о готовности констант
      md.emit('predefined_elmnts_inited');
      // излучаем событие "можно открывать формы"
      adapters.pouch.emit('pouch_complete_loaded');
    });
  }

  /**
   * этот метод адаптер вызывает перед загрузкой doc_ram
   */
  job_prms() {

    // создаём константы из alatable
    this.forEach((row) => this.job_prm(row));

    // дополним автовычисляемыми свойствами
    // const {job_prm: {properties}} = this._owner.$p;
  }

  /**
   * создаёт константу
   * @param row
   */
  job_prm(row) {
    const {job_prm, md, utils} = this._owner.$p;
    const {parents} = this;
    const parent = job_prm[parents[row.parent.valueOf()]];
    const _mgr = row.type.is_ref && md.mgr_by_class_name(row.type.types[0]);

    if(parent) {
      if(parent.synonym === 'lists' || !row.synonym) {
        return;
      }
      if(parent.hasOwnProperty(row.synonym)) {
        delete parent[row.synonym];
      }

      if(row.list == -1) {
        parent.__define(row.synonym, {
          value: (() => {
            const res = {};
            (row.elmnts._obj || row.elmnts).forEach(({elm, value}) => {
              if(elm !== undefined) {
                res[elm.valueOf()] = _mgr ? _mgr.get(value, false, false) : value;
              }
            });
            return res;
          })(),
          configurable: true,
          enumerable: true,
          writable: true,
        });
      }
      else if(row.list) {
        parent.__define(row.synonym, {
          value: (row.elmnts._obj || row.elmnts).map((row) => {
            if(_mgr) {
              const value = _mgr.get(row.value, false, false);
              if(!utils.is_empty_guid(row.elm)) {
                value._formula = row.elm;
              }
              return value;
            }
            else {
              return row.value;
            }
          }),
          configurable: true,
          enumerable: true,
          writable: true,
        });
      }
      else if(row.predefined_name === 'abonent') {
        const {by_ref} = this;
        row.elmnts.forEach((row) => {
          const property = by_ref[row.property];
          if(!property || !property.predefined_name) return;
          const _mgr = property.type.is_ref && md.mgr_by_class_name(property.type.types[0]);
          parent.__define(property.predefined_name, {
            value: _mgr ? _mgr.get(row.value, false, false) : row.value,
            configurable: true,
            enumerable: true,
            writable: true,
          });
        });
      }
      else {
        parent.__define(row.synonym, {
          value: _mgr ? _mgr.get(row.value, false, false) : row.value,
          configurable: true,
          enumerable: true,
          writable: true,
        });
      }
    }
    else {
      $p.record_log({
        class: 'error',
        note: `no parent for ${row.synonym}`,
      });
    }
  }

  /**
   * переопределяем load_array
   * @param aattr {Array.<Object>}
   * @param [forse] {Boolean}
   * @override
   */
  load_array(aattr, forse) {
    const {job_prm} = this._owner.$p;
    const {parents} = this;
    const elmnts = [];
    for (const row of aattr) {
      // если элемент является папкой, создаём раздел в job_prm
      if(row.is_folder && row.synonym) {
        parents[row.ref] = row.synonym;
        !job_prm[row.synonym] && job_prm.__define(row.synonym, {value: {}});
      }
      // если не задан синоним - пропускаем
      else if(row.synonym) {
        const parent = parents[row.parent];
        // если есть подходящая папка, стразу делаем константу
        if(parent && parent.synonym !== 'lists') {
          !job_prm[parents[row.parent]][row.synonym] && this.job_prm(row);
        }
        // если папки нет - сохраним элемент в alatable
        else {
          elmnts.push(row);
        }
      }
      else {
        elmnts.push(row);
      }
    }
    // метод по умолчанию
    elmnts.length && super.load_array(elmnts, forse);
  }

}
$p.cch.create('predefined_elmnts', CchPredefined_elmntsManager, false);
class CatCurrencies extends CatObj{
get name_full(){return this._getter('name_full')}
set name_full(v){this._setter('name_full',v)}
get extra_charge(){return this._getter('extra_charge')}
set extra_charge(v){this._setter('extra_charge',v)}
get main_currency(){return this._getter('main_currency')}
set main_currency(v){this._setter('main_currency',v)}
get parameters_russian_recipe(){return this._getter('parameters_russian_recipe')}
set parameters_russian_recipe(v){this._setter('parameters_russian_recipe',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
}
$p.CatCurrencies = CatCurrencies;
$p.cat.create('currencies');
class CatProperty_values extends CatObj{
get heft(){return this._getter('heft')}
set heft(v){this._setter('heft',v)}
get full_name(){return this._getter('full_name')}
set full_name(v){this._setter('full_name',v)}
get captured(){return this._getter('captured')}
set captured(v){this._setter('captured',v)}
get editor(){return this._getter('editor')}
set editor(v){this._setter('editor',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get owner(){return this._getter('owner')}
set owner(v){this._setter('owner',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatProperty_values = CatProperty_values;
$p.cat.create('property_values');
class CatAccounts extends CatObj{
get prefix(){return this._getter('prefix')}
set prefix(v){this._setter('prefix',v)}
get push_only(){return this._getter('push_only')}
set push_only(v){this._setter('push_only',v)}
get subscription(){return this._getter('subscription')}
set subscription(v){this._setter('subscription',v)}
get ips(){return this._getter('ips')}
set ips(v){this._setter('ips',v)}
get suffix(){return this._getter('suffix')}
set suffix(v){this._setter('suffix',v)}
get direct(){return this._getter('direct')}
set direct(v){this._setter('direct',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get owner(){return this._getter('owner')}
set owner(v){this._setter('owner',v)}
get acl_objs(){return this._getter_ts('acl_objs')}
set acl_objs(v){this._setter_ts('acl_objs',v)}
get subscribers(){return this._getter_ts('subscribers')}
set subscribers(v){this._setter_ts('subscribers',v)}
get ids(){return this._getter_ts('ids')}
set ids(v){this._setter_ts('ids',v)}
}
$p.CatAccounts = CatAccounts;
class CatAccountsAcl_objsRow extends TabularSectionRow{
get obj(){return this._getter('obj')}
set obj(v){this._setter('obj',v)}
get by_default(){return this._getter('by_default')}
set by_default(v){this._setter('by_default',v)}
}
$p.CatAccountsAcl_objsRow = CatAccountsAcl_objsRow;
class CatAccountsSubscribersRow extends TabularSectionRow{
get abonent(){return this._getter('abonent')}
set abonent(v){this._setter('abonent',v)}
get branch(){return this._getter('branch')}
set branch(v){this._setter('branch',v)}
get roles(){return this._getter('roles')}
set roles(v){this._setter('roles',v)}
}
$p.CatAccountsSubscribersRow = CatAccountsSubscribersRow;
class CatAccountsIdsRow extends TabularSectionRow{
get identifier(){return this._getter('identifier')}
set identifier(v){this._setter('identifier',v)}
get server(){return this._getter('server')}
set server(v){this._setter('server',v)}
get password_hash(){return this._getter('password_hash')}
set password_hash(v){this._setter('password_hash',v)}
}
$p.CatAccountsIdsRow = CatAccountsIdsRow;
$p.cat.create('accounts');
class CatPartners extends CatObj{
get name_full(){return this._getter('name_full')}
set name_full(v){this._setter('name_full',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get inn(){return this._getter('inn')}
set inn(v){this._setter('inn',v)}
get kpp(){return this._getter('kpp')}
set kpp(v){this._setter('kpp',v)}
get ogrn(){return this._getter('ogrn')}
set ogrn(v){this._setter('ogrn',v)}
get okpo(){return this._getter('okpo')}
set okpo(v){this._setter('okpo',v)}
get individual_legal(){return this._getter('individual_legal')}
set individual_legal(v){this._setter('individual_legal',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get contact_information(){return this._getter_ts('contact_information')}
set contact_information(v){this._setter_ts('contact_information',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}
}
$p.CatPartners = CatPartners;
class CatPartnersContact_informationRow extends TabularSectionRow{
get type(){return this._getter('type')}
set type(v){this._setter('type',v)}
get kind(){return this._getter('kind')}
set kind(v){this._setter('kind',v)}
get presentation(){return this._getter('presentation')}
set presentation(v){this._setter('presentation',v)}
get values_fields(){return this._getter('values_fields')}
set values_fields(v){this._setter('values_fields',v)}
get country(){return this._getter('country')}
set country(v){this._setter('country',v)}
get region(){return this._getter('region')}
set region(v){this._setter('region',v)}
get city(){return this._getter('city')}
set city(v){this._setter('city',v)}
get email_address(){return this._getter('email_address')}
set email_address(v){this._setter('email_address',v)}
get server_domain_name(){return this._getter('server_domain_name')}
set server_domain_name(v){this._setter('server_domain_name',v)}
get phone_number(){return this._getter('phone_number')}
set phone_number(v){this._setter('phone_number',v)}
get phone_without_codes(){return this._getter('phone_without_codes')}
set phone_without_codes(v){this._setter('phone_without_codes',v)}
}
$p.CatPartnersContact_informationRow = CatPartnersContact_informationRow;
class CatPartnersExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get txt_row(){return this._getter('txt_row')}
set txt_row(v){this._setter('txt_row',v)}
}
$p.CatPartnersExtra_fieldsRow = CatPartnersExtra_fieldsRow;
$p.cat.create('partners');
class CatDestinations extends CatObj{
get used(){return this._getter('used')}
set used(v){this._setter('used',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}
get extra_properties(){return this._getter_ts('extra_properties')}
set extra_properties(v){this._setter_ts('extra_properties',v)}
}
$p.CatDestinations = CatDestinations;
class CatDestinationsExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get _deleted(){return this._getter('_deleted')}
set _deleted(v){this._setter('_deleted',v)}
}
$p.CatDestinationsExtra_fieldsRow = CatDestinationsExtra_fieldsRow;
class CatDestinationsExtra_propertiesRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get _deleted(){return this._getter('_deleted')}
set _deleted(v){this._setter('_deleted',v)}
}
$p.CatDestinationsExtra_propertiesRow = CatDestinationsExtra_propertiesRow;
$p.cat.create('destinations');
class CatNom extends CatObj{
get article(){return this._getter('article')}
set article(v){this._setter('article',v)}
get nom_kind(){return this._getter('nom_kind')}
set nom_kind(v){this._setter('nom_kind',v)}
get captured(){return this._getter('captured')}
set captured(v){this._setter('captured',v)}
get editor(){return this._getter('editor')}
set editor(v){this._setter('editor',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatNom = CatNom;
$p.cat.create('nom');
class CatOrganizations extends CatObj{
get prefix(){return this._getter('prefix')}
set prefix(v){this._setter('prefix',v)}
get individual_legal(){return this._getter('individual_legal')}
set individual_legal(v){this._setter('individual_legal',v)}
get inn(){return this._getter('inn')}
set inn(v){this._setter('inn',v)}
get kpp(){return this._getter('kpp')}
set kpp(v){this._setter('kpp',v)}
get ogrn(){return this._getter('ogrn')}
set ogrn(v){this._setter('ogrn',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatOrganizations = CatOrganizations;
$p.cat.create('organizations');
class CatUsers extends CatObj{
get invalid(){return this._getter('invalid')}
set invalid(v){this._setter('invalid',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get ancillary(){return this._getter('ancillary')}
set ancillary(v){this._setter('ancillary',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}
get contact_information(){return this._getter_ts('contact_information')}
set contact_information(v){this._setter_ts('contact_information',v)}
}
$p.CatUsers = CatUsers;
class CatUsersExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get txt_row(){return this._getter('txt_row')}
set txt_row(v){this._setter('txt_row',v)}
}
$p.CatUsersExtra_fieldsRow = CatUsersExtra_fieldsRow;
class CatUsersContact_informationRow extends TabularSectionRow{
get type(){return this._getter('type')}
set type(v){this._setter('type',v)}
get kind(){return this._getter('kind')}
set kind(v){this._setter('kind',v)}
get presentation(){return this._getter('presentation')}
set presentation(v){this._setter('presentation',v)}
get values_fields(){return this._getter('values_fields')}
set values_fields(v){this._setter('values_fields',v)}
get country(){return this._getter('country')}
set country(v){this._setter('country',v)}
get region(){return this._getter('region')}
set region(v){this._setter('region',v)}
get city(){return this._getter('city')}
set city(v){this._setter('city',v)}
get email_address(){return this._getter('email_address')}
set email_address(v){this._setter('email_address',v)}
get server_domain_name(){return this._getter('server_domain_name')}
set server_domain_name(v){this._setter('server_domain_name',v)}
get phone_number(){return this._getter('phone_number')}
set phone_number(v){this._setter('phone_number',v)}
get phone_without_codes(){return this._getter('phone_without_codes')}
set phone_without_codes(v){this._setter('phone_without_codes',v)}
get list_view(){return this._getter('list_view')}
set list_view(v){this._setter('list_view',v)}
}
$p.CatUsersContact_informationRow = CatUsersContact_informationRow;
$p.cat.create('users');
class CatArticles extends CatObj{
get h1(){return this._getter('h1')}
set h1(v){this._setter('h1',v)}
get descr(){return this._getter('descr')}
set descr(v){this._setter('descr',v)}
get introduction(){return this._getter('introduction')}
set introduction(v){this._setter('introduction',v)}
get content(){return this._getter('content')}
set content(v){this._setter('content',v)}
get img(){return this._getter('img')}
set img(v){this._setter('img',v)}
get date(){return this._getter('date')}
set date(v){this._setter('date',v)}
get author(){return this._getter('author')}
set author(v){this._setter('author',v)}
get sorting_field(){return this._getter('sorting_field')}
set sorting_field(v){this._setter('sorting_field',v)}
get published(){return this._getter('published')}
set published(v){this._setter('published',v)}
get formula(){return this._getter('formula')}
set formula(v){this._setter('formula',v)}
get category(){return this._getter('category')}
set category(v){this._setter('category',v)}
get footer(){return this._getter('footer')}
set footer(v){this._setter('footer',v)}
get social(){return this._getter('social')}
set social(v){this._setter('social',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get tags(){return this._getter_ts('tags')}
set tags(v){this._setter_ts('tags',v)}
get articles(){return this._getter_ts('articles')}
set articles(v){this._setter_ts('articles',v)}
get aliases(){return this._getter_ts('aliases')}
set aliases(v){this._setter_ts('aliases',v)}
get acl(){return this._getter_ts('acl')}
set acl(v){this._setter_ts('acl',v)}
get acl_att(){return this._getter_ts('acl_att')}
set acl_att(v){this._setter_ts('acl_att',v)}
}
$p.CatArticles = CatArticles;
class CatArticlesTagsRow extends TabularSectionRow{
get tag(){return this._getter('tag')}
set tag(v){this._setter('tag',v)}
}
$p.CatArticlesTagsRow = CatArticlesTagsRow;
class CatArticlesArticlesRow extends TabularSectionRow{
get paper(){return this._getter('paper')}
set paper(v){this._setter('paper',v)}
}
$p.CatArticlesArticlesRow = CatArticlesArticlesRow;
class CatArticlesAliasesRow extends TabularSectionRow{
get url(){return this._getter('url')}
set url(v){this._setter('url',v)}
}
$p.CatArticlesAliasesRow = CatArticlesAliasesRow;
class CatArticlesAclRow extends TabularSectionRow{
get role(){return this._getter('role')}
set role(v){this._setter('role',v)}
get w(){return this._getter('w')}
set w(v){this._setter('w',v)}
}
$p.CatArticlesAclRow = CatArticlesAclRow;
class CatArticlesAcl_attRow extends TabularSectionRow{
get name(){return this._getter('name')}
set name(v){this._setter('name',v)}
get role(){return this._getter('role')}
set role(v){this._setter('role',v)}
get w(){return this._getter('w')}
set w(v){this._setter('w',v)}
}
$p.CatArticlesAcl_attRow = CatArticlesAcl_attRow;
class CatArticlesManager extends CatManager {

  constructor(owner, class_name) {
    super(owner, class_name);
    this._aliases = {};
    this._tags = new Map();
  }

  // реквизит поиска по строке
  build_search(tmp, tObj) {
    tmp.search = (tObj.name + ' ' + tObj.id).toLowerCase();
  }

  load_array(aattr, forse) {
    const arr = super.load_array(aattr, forse);
    for(const o of arr) {
      this._aliases[o.id] = o;
      for(const {url} of o.aliases) {
        this._aliases[url] = o;
      }
      for(const {tag} of o.tags) {
        if(!this._tags.has(tag)) {
          this._tags.set(tag, []);
        }
        this._tags.get(tag).push(o);
      }
    }
    return arr;
  }
}
$p.cat.create('articles', CatArticlesManager, false);
class CatTags extends CatObj{
get synonym(){return this._getter('synonym')}
set synonym(v){this._setter('synonym',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
}
$p.CatTags = CatTags;
$p.cat.create('tags');
class CatNom_prices_types extends CatObj{
get price_currency(){return this._getter('price_currency')}
set price_currency(v){this._setter('price_currency',v)}
get discount_percent(){return this._getter('discount_percent')}
set discount_percent(v){this._setter('discount_percent',v)}
get vat_price_included(){return this._getter('vat_price_included')}
set vat_price_included(v){this._setter('vat_price_included',v)}
get rounding_order(){return this._getter('rounding_order')}
set rounding_order(v){this._setter('rounding_order',v)}
get rounding_in_a_big_way(){return this._getter('rounding_in_a_big_way')}
set rounding_in_a_big_way(v){this._setter('rounding_in_a_big_way',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
}
$p.CatNom_prices_types = CatNom_prices_types;
$p.cat.create('nom_prices_types');
class CatFormulas extends CatObj{
get formula(){return this._getter('formula')}
set formula(v){this._setter('formula',v)}
get leading_formula(){return this._getter('leading_formula')}
set leading_formula(v){this._setter('leading_formula',v)}
get condition_formula(){return this._getter('condition_formula')}
set condition_formula(v){this._setter('condition_formula',v)}
get definition(){return this._getter('definition')}
set definition(v){this._setter('definition',v)}
get template(){return this._getter('template')}
set template(v){this._setter('template',v)}
get sorting_field(){return this._getter('sorting_field')}
set sorting_field(v){this._setter('sorting_field',v)}
get async(){return this._getter('async')}
set async(v){this._setter('async',v)}
get disabled(){return this._getter('disabled')}
set disabled(v){this._setter('disabled',v)}
get context(){return this._getter('context')}
set context(v){this._setter('context',v)}
get jsx(){return this._getter('jsx')}
set jsx(v){this._setter('jsx',v)}
get captured(){return this._getter('captured')}
set captured(v){this._setter('captured',v)}
get editor(){return this._getter('editor')}
set editor(v){this._setter('editor',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get params(){return this._getter_ts('params')}
set params(v){this._setter_ts('params',v)}


  execute(obj, attr) {

    const {_manager, _data, ref} = this;
    const {$p} = _manager._owner;
    const {ireg, msg, ui} = $p;

    // создаём функцию из текста формулы
    if(!_data._formula && this.formula){
      try{
        if(this.jsx) {
          _data._formula = new Function('$p', this.formula)($p);
        }
        else {
          if(this.async) {
            const AsyncFunction = Object.getPrototypeOf(eval('(async function(){})')).constructor;
            _data._formula = (new AsyncFunction('obj,$p,attr', this.formula)).bind(this);
          }
          else {
            _data._formula = (new Function('obj,$p,attr', this.formula)).bind(this);
          }
        }
      }
      catch(err){
        _data._formula = () => false;
        $p.record_log(err);
      }
    }

    const {_formula} = _data;

    if(this.parent == _manager.predefined('printing_plates')) {

      if(!_formula) {
        msg.show_msg({
          title: msg.bld_title,
          type: 'alert-error',
          text: `Ошибка в формуле<br /><b>${this.name}</b>`
        });
        return Promise.resolve();
      }

      // рендерим jsx в новое окно
      if(this.jsx) {
        return ui.dialogs.window({
          Component: _formula,
          title: this.name,
          //print: true,
          obj,
          attr,
        });
      }

      // получаем HTMLDivElement с отчетом
      ireg.log?.timeStart?.(ref);
      return _formula(obj, $p, attr)

      // показываем отчет в отдельном окне
        .then((doc) => {
          ireg.log?.timeEnd?.(ref);
          $p.SpreadsheetDocument && doc instanceof $p.SpreadsheetDocument && doc.print();
        })
        .catch(err => {
          ireg.log?.timeEnd?.(ref, err);
          throw err;
        });

    }
    else {
      ireg.log?.timeStart?.(ref);
      const res = _formula && _formula(obj, $p, attr);
      ireg.log?.timeEnd?.(ref);
      return res;
    }
  }

  get _template() {
    const {_data, _manager} = this;
    if(!_data._template){
      const {SpreadsheetDocument} = _manager._owner.$p;
      if(SpreadsheetDocument) {
        _data._template = new SpreadsheetDocument(this.template);
      }
    }
    return _data._template;
  }
}
$p.CatFormulas = CatFormulas;
class CatFormulasManager extends CatManager {

  constructor(owner, class_name) {
    super(owner, class_name);
    this._owner.$p.adapters.pouch.once('pouch_data_loaded', () => this.load_formulas.bind(this));
  }

  load_formulas(src) {
    const {md, utils, wsql} = $p;
    const {isNode, isBrowser} = wsql.alasql.utils;
    const parents = [this.predefined('printing_plates'), this.predefined('modifiers')];
    const filtered = [];
    (src || this).forEach((v) => {
      if(!v.disabled && parents.includes(v.parent)){
        if(v.context === 1 && !isBrowser || v.context === 2 && !isNode) {
          return;
        }
        filtered.push(v);
      }
    });

    const compare = utils.sort('name');

    filtered.sort(utils.sort('sorting_field')).forEach((formula) => {
      // формируем списки печатных форм и внешних обработок
      if(formula.parent == parents[0]) {
        formula.params.find_rows({param: 'destination'}, (dest) => {
          const dmgr = md.mgr_by_class_name(dest.value);
          if(dmgr) {
            const tmp = dmgr._printing_plates ? Object.values(dmgr._printing_plates) : [];
            tmp.push(formula);
            tmp.sort(compare);
            dmgr._printing_plates = {};
            for(const elm of tmp) {
              dmgr._printing_plates[`prn_${elm.ref}`] = elm;
            }
          }
        });
      }
      else {
        // выполняем модификаторы
        try {
          const res = formula.execute();
          // еслм модификатор вернул задание кроносу - добавляем планировщик
          res && utils.cron && utils.cron(res);
        }
        catch (err) {
        }
      }
    });
  }

  // переопределяем load_array - не грузим неактивные формулы
  load_array(aattr, forse) {
    const res = super.load_array(aattr.filter((v) => !v.disabled || v.is_folder), forse);
    const modifiers = this.predefined('modifiers');
    for(const doc of res) {
      const {_data, parent} = doc;
      if(_data._formula) {
        _data._formula = null;
        if(parent === modifiers) {
          $p.record_log(`runtime modifier '${doc.name}'`);
        }
      }
      if(_data._template) {
        _data._template = null;
      }
    }
  }

}
$p.cat.create('formulas', CatFormulasManager, false);
class CatCharacteristics extends CatObj{
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get owner(){return this._getter('owner')}
set owner(v){this._setter('owner',v)}
}
$p.CatCharacteristics = CatCharacteristics;
$p.cat.create('characteristics');
class DocWork_centers_task extends DocObj{
get cuts(){return this._getter_ts('cuts')}
set cuts(v){this._setter_ts('cuts',v)}
get cutting(){return this._getter_ts('cutting')}
set cutting(v){this._setter_ts('cutting',v)}


  /**
   * значения по умолчанию при добавлении строки
   * @param {TabularSectionRow} row
   * @param {Object} [attr]
   */
  add_row(row, attr) {
    if(row?._owner === this.cuts) {
      if(!row.stick && !attr?.stick) {
        const {_obj} = row._owner;
        row._obj.stick = 1 + (_obj.length ? Math.max.apply(null, _obj.map(({stick}) => stick)) : 0);
      }
    }
  }


  fill_cuts() {
    const {debit} = $p.enm.debit_credit_kinds;
    const {cutting, cuts} = this;
    for(const {nom, characteristic} of cutting) {
      if(!cuts.find({nom, characteristic})) {
        cuts.add({
          record_kind: debit,
          nom,
          characteristic,
          len: nom.len,
          width: nom.width,
          quantity: nom.width ? 100 : nom.len / 1000,
        });
      }
    }
    return this;
  }

  fragments2D() {
    const {debit} = $p.enm.debit_credit_kinds;
    const res = {
      products: [],
      scraps: [],
      options: {}
    };
    for(const row of this.cuts) {
      if(row.record_kind.empty()) {
        row.record_kind = debit;
      }
      if(!row.stick) {
        row.stick = this.cuts.aggregate([], ['stick'], 'max') + 1;
      }
      if(row.record_kind.is('debit') && row.width && row.len && row.quantity) {
        res.scraps.push({stick: row.stick, length: row.len, height: row.width, quantity: row.quantity});
      }
    }
    for(const row of this.cutting) {
      if(row.width && row.len) {
        res.products.push({id: row.row, length: row.len, height: row.width, quantity: 1, info: row.row});
      }
    }
    return res;
  }

  /**
   * Возвращает свёрнутую структуру номенклатур, характеристик и партий раскроя
   */
  fragments1D(noParts) {
    const {_owner: {$p: {utils}}, cut_defaults} = this._manager;
    const res = new Map();
    const fin = [];
    for(const row of this.cutting) {
      if(row.width) {
        continue;
      }
      if(!res.has(row.nom)) {
        res.set(row.nom, new Map());
      }
      const nom = res.get(row.nom);
      if(!nom.has(row.characteristic)) {
        nom.set(row.characteristic, []);
      }
      const characteristic = nom.get(row.characteristic);
      if(!noParts) {
        row.stick = 0;
        row.part = 0;
      }
      characteristic.push(row);
    }
    if(noParts) {
      return res;
    }
    // расставим партии
    for(const [nom, characteristics] of res) {
      for(const [characteristic, rows] of characteristics) {
        if(rows.length > cut_defaults.batch) {
          rows.sort(utils.sort('len'));
          const parts = (rows.length / cut_defaults.batch + 0.5).round();
          const part = (rows.length / parts).round();
          for(let i1 = 0; i1 < part; i1++) {
            for(let i2 = 0; i2 < parts; i2++) {
              const rowNum = i1 * parts + i2;
              if(rowNum >= rows.length) {
                continue;
              }
              const row = rows[rowNum];
              if(!row.pair) {
                row.part = i2;
              }
              else {
                for(const prow of rows) {
                  if(prow.pair === row.pair) {
                    prow.part = i2;
                  }
                }
              }
            }
          }
          for(let part = 0; part < parts; part++) {
            fin.push({nom, characteristic, part, parts, rows: rows.filter((row) => row.part === part)});
          }
        }
        else {
          fin.push({nom, characteristic, part: 0, parts: 1, rows});
        }
      }
    }
    return fin;
  }

  onStep1D(state) {
    return (status) => {
      const {nom, characteristic} = status.cut_row;
      const statuses = [...state.statuses];
      let row;
      if(!statuses.some((elm) => {
        if(elm.nom === nom && elm.characteristic === characteristic) {
          row = elm;
          return true;
        }
      })) {
        row = {nom, characteristic};
        statuses.push(row);
      }
      Object.assign(row, status);

      state.statuses = statuses;
    };
  }

  /**
   * @summary Выполняет оптимизацию раскроя
   * @param {Function} [onStep]
   * @param {Object} [state]
   * @return {Promise<Awaited<unknown>[]>}
   */
  optimize({onStep, state}) {
    const {classes: {Cutting}} = $p;
    if(!state) {
      state = {statuses: []};
    }
    if(!onStep) {
      onStep = this.onStep1D(state);
    }
    const keys = new Set();
    const queues = [Promise.resolve(), Promise.resolve(), Promise.resolve()];
    let index = -1;
    for(const {nom, characteristic, part, parts, rows} of this.fragments1D()) {
      const key = nom.valueOf() + characteristic.valueOf();
      if(!keys.has(key)) {
        keys.add(key);
        index++;
        if(index > 2) {
          index = 0;
        }
      }
      queues[index] = queues[index].then(() => this.optimize_fragment({
        cutting: new Cutting('1D'),
        rows,
        part,
        parts,
        onStep,
      }));
    }
    const fin = [];
    Object.values(queues).forEach((v, index) => {
      const i = index % 2;
      if(!fin[i]) {
        fin[i] = v;
      }
      else {
        fin[i] = fin[i].then(() => v);
      }
    })
    return Promise.all(fin)
      .then(() => state);
  }

  /**
   * Выполняет оптимизацию фрагмента (номенклатура+характеристика+тип)
   * @param opts
   * @return {Promise<void>}
   */
  optimize_fragment({cutting, rows, onStep, part, parts}) {
    const {_owner: {$p: {job_prm}}, cut_defaults} = this._manager;

    return new Promise((resolve) => {

      const doc = this;
      const workpieces = [];
      const cut_row = rows[0];
      if(cut_row) {
        // ищем запись в расходе - её туда могли положить руками, либо подтянулось из остатков
        this.cuts.find_rows({
          _top: 10e6,
          //record_kind: debit_credit_kinds.debit,
          nom: cut_row.nom,
          characteristic: cut_row.characteristic,
        }, (row) => {
          const len = row.len - row.used;
          if(len >= rows[0].len && len >= (cut_row.nom.usefulscrap || cut_defaults.usefulscrap)) {
            workpieces.push(row);
          }
        });
      }

      const config = Object.assign({}, cut_defaults);
      if(rows.length < 13) {
        config.iterations = 100;
      }
      const len0 = rows[0].len;
      if(rows.every(({len}) => len === len0)) {
        config.iterations = 3;
      }
      const userData = {
        products: rows.map((row) => row.len),
        workpieces: workpieces.map((row) => row.len - row.used),
        overmeasure: 0,
        wrongsnipmin: 0,
        wrongsnipmax: 0,
        sticklength: cut_row.nom.len || 6000,
        knifewidth: cut_row.nom.knifewidth || 7,
        usefulscrap: cut_row.nom.usefulscrap || cut_defaults.usefulscrap,
      };
      cutting.genetic.notification = function(pop, generation, stats, isFinished) {

        if(job_prm.idle) {
          job_prm.idle.activity = Date.now();
        }

        if(!generation) {
          return;
        }

        // текущий результат
        const decision = Object.assign({
          cut_row,
          userData,
          cuts: workpieces,
          rows,
          part,
          parts,
          progress: isFinished ? 1 : generation / this.configuration.iterations,
        }, this.fitness(pop[0].entity, true));

        // обновляем интерфейс
        onStep(decision);

        if(isFinished) {
          // обновляем документ
          doc.push_cut_result(decision, part + 1 === parts);
          resolve();
        }

      };

      cutting.evolve(config, userData);

    });
  }

  /**
   * помещает результат раскроя в документ
   */
  push_cut_result(decision, fin) {
    const {debit_credit_kinds} = $p.enm;
    // сначала добавляем заготовки
    for(let i = 0; i < decision.workpieces.length; i++) {
      let workpiece = decision.cuts[i];

      if(workpiece) {
        workpiece.used = workpiece.len - decision.workpieces[i];
        //workpiece.quantity = decision.workpieces[i] / 1000;
      }
      else {
        workpiece = this.cuts.add({
          record_kind: debit_credit_kinds.credit,
          nom: decision.cut_row.nom,
          characteristic: decision.cut_row.characteristic,
          len: decision.userData.sticklength,
          quantity: decision.userData.sticklength / 1000,
        });
        decision.cuts.push(workpiece);
      }
    }

    // проставляем номера палок в раскрое
    for(let i = 0; i < decision.res.length; i++) {
      const {stick} = decision.cuts[decision.res[i]];
      decision.rows[i].stick = stick;
    }
    for(let i = 0; i < decision.res.length; i++) {
      const cut_row = decision.cuts[decision.res[i]];
      const rows = this.cutting.find_rows({stick: cut_row.stick});
      const len = rows.reduce((sum, row) => sum + row.len + decision.userData.knifewidth, 0);
      cut_row.used = len;
    }
    if(fin) {
      // формируем приход деловых остатков
      const workpieces = [];
      this.cuts.find_rows({
        _top: 10e6,
        nom: decision.cut_row.nom,
        characteristic: decision.cut_row.characteristic,
      }, (row) => {
        const len = row.len - row.used;
        if(len >= decision.userData.usefulscrap) {
          workpieces.push({
            record_kind: debit_credit_kinds.debit,
            nom: decision.cut_row.nom,
            characteristic: decision.cut_row.characteristic,
            len,
            quantity: len / 1000,
          });
        }
      });
      for(const raw of workpieces) {
        this.cuts.add(raw);
      }
    }

  }

  /**
   * @summary Чистит результаты раскроя в табчасти cutting
   * @desc Параллельно, подчищает табчасть cuts
   */
  reset_sticks(kind) {
    const noms = new Map();
    for(const row of this.cutting) {
      if(!kind || (kind === '1D' && !row.width) || (kind === '2D' && row.width)) {
        if(noms.has(row.nom)) {
          noms.get(row.nom).add(row.characteristic);
        }
        else {
          noms.set(row.nom, new Set([row.characteristic]));
        }
        row.stick = 0;
        row.pair = 0;
      }
    }
    const rm = [];
    for(const [nom, characteristics] of noms) {
      for(const characteristic of characteristics) {
        this.cuts.find_rows({nom, characteristic}, (row) => {
          if(row.record_kind.is('credit') || (!row.width && row.len === nom.len) || (row.width === nom.width && row.len === nom.len)) {
            rm.push(row);
          }
          else {
            row.dop = {svg: ''};
          }
        });
      }
    }
    for(const row of rm) {
      this.cuts.del(row);
    }
  }
}
$p.DocWork_centers_task = DocWork_centers_task;
class DocWork_centers_taskCutsRow extends TabularSectionRow{
get record_kind(){return this._getter('record_kind')}
set record_kind(v){this._setter('record_kind',v)}
get stick(){return this._getter('stick')}
set stick(v){this._setter('stick',v)}
get pair(){return this._getter('pair')}
set pair(v){this._setter('pair',v)}
get nom(){return this._getter('nom')}
set nom(v){this._setter('nom',v)}
get characteristic(){return this._getter('characteristic')}
set characteristic(v){this._setter('characteristic',v)}
get len(){return this._getter('len')}
set len(v){this._setter('len',v)}
get width(){return this._getter('width')}
set width(v){this._setter('width',v)}
get used(){return this._getter('used')}
set used(v){this._setter('used',v)}
get x(){return this._getter('x')}
set x(v){this._setter('x',v)}
get y(){return this._getter('y')}
set y(v){this._setter('y',v)}
get quantity(){return this._getter('quantity')}
set quantity(v){this._setter('quantity',v)}
get cell(){return this._getter('cell')}
set cell(v){this._setter('cell',v)}
get dop(){return this._getter('dop')}
set dop(v){this._setter('dop',v)}
}
$p.DocWork_centers_taskCutsRow = DocWork_centers_taskCutsRow;
class DocWork_centers_taskCuttingRow extends TabularSectionRow{
get obj(){return this._getter('obj')}
set obj(v){this._setter('obj',v)}
get production(){return this._getter('production')}
set production(v){this._setter('production',v)}
get specimen(){return this._getter('specimen')}
set specimen(v){this._setter('specimen',v)}
get elm(){return this._getter('elm')}
set elm(v){this._setter('elm',v)}
get nom(){return this._getter('nom')}
set nom(v){this._setter('nom',v)}
get characteristic(){return this._getter('characteristic')}
set characteristic(v){this._setter('characteristic',v)}
get len(){return this._getter('len')}
set len(v){this._setter('len',v)}
get width(){return this._getter('width')}
set width(v){this._setter('width',v)}
get stick(){return this._getter('stick')}
set stick(v){this._setter('stick',v)}
get pair(){return this._getter('pair')}
set pair(v){this._setter('pair',v)}
get orientation(){return this._getter('orientation')}
set orientation(v){this._setter('orientation',v)}
get elm_type(){return this._getter('elm_type')}
set elm_type(v){this._setter('elm_type',v)}
get alp1(){return this._getter('alp1')}
set alp1(v){this._setter('alp1',v)}
get alp2(){return this._getter('alp2')}
set alp2(v){this._setter('alp2',v)}
get cell(){return this._getter('cell')}
set cell(v){this._setter('cell',v)}
get part(){return this._getter('part')}
set part(v){this._setter('part',v)}
get x(){return this._getter('x')}
set x(v){this._setter('x',v)}
get y(){return this._getter('y')}
set y(v){this._setter('y',v)}
get rotated(){return this._getter('rotated')}
set rotated(v){this._setter('rotated',v)}
get nonstandard(){return this._getter('nonstandard')}
set nonstandard(v){this._setter('nonstandard',v)}
}
$p.DocWork_centers_taskCuttingRow = DocWork_centers_taskCuttingRow;
class DocWork_centers_taskManager extends DocManager {

  get cut_defaults() {
    if(!this._cut_defaults) {
      const {$p: {job_prm}} = this._owner;
      this._cut_defaults = Object.freeze({
        iterations: 2900,
        size: 210,        // размер популяции
        crossover: 0.19,
        mutation: 0.26,
        random: 0.21,
        skip: 55,         // прекращаем итерации, если решение не улучшилось за 55 шагов
        webWorkers: !job_prm.is_node,
        batch: 101,       // размер партии
        usefulscrap: 610, // деловой остаток
      });
    }
    return this._cut_defaults;
  }
}
$p.doc.create('work_centers_task', DocWork_centers_taskManager, false);
class IregLog_view extends RegisterRow{
get key(){return this._getter('key')}
set key(v){this._setter('key',v)}
get user(){return this._getter('user')}
set user(v){this._setter('user',v)}
}
$p.IregLog_view = IregLog_view;
$p.ireg.create('log_view');

/*
 * Подмешивается в конец init-файла
 *
 */

/**
 * Абстрактная строка табчасти параметров
 * @class
 */
class ParamsRow extends TabularSectionRow{
  get param(){
    return this._getter('param') || $p.cch.properties.get();
  }
  set param(v){this._setter('param',v)}
  get value(){
    const {param} = this;
    return (param && param.fetch_type && !param.empty()) ? param.fetch_type(this._obj.value) : this._getter('value');
  }
  set value(v){
    if(typeof v === 'string' && v.length === 72 && this.param.type?.types?.includes('cat.clrs')) {
      v = $p.cat.clrs.getter(v);
    }
    this._setter('value',v);
  }
}

/**
 * Строка табчасти параметров с признаком сокрытия
 * @class
 */
class HideParamsRow extends ParamsRow{
  get hide(){return this._getter('hide')}
  set hide(v){this._setter('hide',v)}
}

/**
 * Строка табчасти допреквизитов
 * @class
 */
class Extra_fieldsRow extends TabularSectionRow{
  get property(){return this._getter('property')}
  set property(v){this._setter('property',v)}
  get value(){
    const {property: param} = this;
    return (param && param.fetch_type && !param.empty()) ? param.fetch_type(this._obj.value) : this._getter('value');
  }
  set value(v) {
    if(typeof v === 'string' && v.length === 72 && this.property?.type?.types?.includes('cat.clrs')) {
      v = $p.cat.clrs.getter(v);
    }
    this._setter('value', v);
  }
  get txt_row(){return this._getter('txt_row')}
  set txt_row(v){this._setter('txt_row',v)}
}

/**
 * Строка допреквизитов ключей параметров
 * @class
 */
class CatParameters_keysParamsRow extends Extra_fieldsRow{
  get area(){return this._getter('area')}
  set area(v){this._setter('area',v)}
  get origin(){return this._getter('origin')}
  set origin(v){this._setter('origin',v)}
  get comparison_type(){return this._getter('comparison_type')}
  set comparison_type(v){this._setter('comparison_type',v)}
}


/**
 * Строка табчасти параметров формул
 * @class
 */
class CatFormulasParamsRow extends ParamsRow{}



Object.assign($p, {
  Extra_fieldsRow,
  CatFormulasParamsRow,
  CatParameters_keysParamsRow,
});

})();
};