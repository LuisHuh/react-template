/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Administrador de monedas.
 */

'use strict';

export default class CurrencyManager {
    constructor() {}

    // display n['en'] = 100,000.00
    // display n['de'] = 100.000,00
    // display n['bg'] = 100000,00
    // display n['cs'] = 100 000,00
    // display n['he'] = 1,00,000.00
    static availableFormat = ['en', 'de', 'bg', 'cs', 'he'];

    /**
     * Lista de idiomas admitidos
     */
    static availableLangs = [
        'es',
        'en',
        'de',
        'af',
        'am',
        'ar',
        'bn',
        'bg',
        'ca',
        'cs',
        'nl',
        'et',
        'fr',
        'he',
        'hi',
        'it',
        'nb',
        'ms',
        'id',
        'pl',
    ];

	/**
	 * Lista de países admitidos
	 */
	static availableRegions = ['usa', 'mex', ''];
    /**
     * Lista de formato moneda admitido
     */
    static availableCurrencyDisplay = ['symbol', 'narrowSymbol', 'code', 'name'];

    /**
     * Formato de país para la librería Intl.
     */
    availableCountries = [
        'US',
        'MX',
        'EN',
        'DE',
        'AF',
        'AM',
        'AR',
        'BN',
        'BG',
        'CA',
        'CS',
        'NL',
        'ET',
        'FR',
        'HE',
        'HI',
        'IT',
        'NB',
        'MS',
        'ID',
        'PL',
    ];

    /**
     * Lista de tipo de moneda admitido
     */
    static availableCurrency = [
        'AFN', // ->    AFGHANISTAN                                                     Afghani
        'EUR', // ->    ÅLAND ISLANDS                                                   Euro
        'ALL', // ->    ALBANIA                                                         Lek
        'DZD', // ->    ALGERIA                                                         Algerian Dinar
        'USD', // ->    USA                                                             US Dollar
        'AOA', // ->    ANGOLA                                                          Kwanza
        'XCD', // ->    ANGUILLA                                                        East Caribbean Dollar
        'ARS', // ->    ARGENTINA                                                       Argentine Peso
        'AMD', // ->    ARMENIA                                                         Armenian Dram
        'AWG', // ->    ARUBA                                                           Aruban Florin
        'AUD', // ->    AUSTRALIA                                                       Australian Dollar
        'AZN', // ->    AZERBAIJAN                                                      Azerbaijan Manat
        'BSD', // ->    BAHAMAS (THE)                                                   Bahamian Dollar
        'BHD', // ->    BAHRAIN                                                         Bahraini Dinar
        'BDT', // ->    BANGLADESH                                                      Taka
        'BBD', // ->    BARBADOS                                                        Barbados Dollar
        'BYN', // ->    BELARUS                                                         Belarusian Ruble
        'BZD', // ->    BELIZE                                                          Belize Dollar
        'XOF', // ->    BENIN                                                           CFA Franc BCEAO
        'BMD', // ->    BERMUDA                                                         Bermudian Dollar
        'INR', // ->    BHUTAN                                                          Indian Rupee
        'BTN', // ->    BHUTAN                                                          Ngultrum
        'BOB', // ->    BOLIVIA (PLURINATIONAL STATE OF)                                Boliviano
        'BOV', // ->    BOLIVIA (PLURINATIONAL STATE OF)                                Mvdol
        'BAM', // ->    BOSNIA AND HERZEGOVINA                                          Convertible Mark
        'BWP', // ->    BOTSWANA                                                        Pula
        'NOK', // ->    BOUVET ISLAND                                                   Norwegian Krone
        'BRL', // ->    BRAZIL                                                          Brazilian Real
        'BND', // ->    BRUNEI DARUSSALAM                                               Brunei Dollar
        'BGN', // ->    BULGARIA                                                        Bulgarian Lev
        'BIF', // ->    BURUNDI                                                         Burundi Franc
        'CVE', // ->    CABO VERDE                                                      Cabo Verde Escudo
        'KHR', // ->    CAMBODIA                                                        Riel
        'XAF', // ->    CAMEROON                                                        CFA Franc BEAC
        'CAD', // ->    CANADA                                                          Canadian Dollar
        'KYD', // ->    CAYMAN ISLANDS (THE)                                            Cayman Islands Dollar
        'CLP', // ->    CHILE                                                           Chilean Peso
        'CLF', // ->    CHILE                                                           Unidad de Fomento
        'CNY', // ->    CHINA                                                           Yuan Renminbi
        'COP', // ->    COLOMBIA                                                        Colombian Peso
        'COU', // ->    COLOMBIA                                                        Unidad de Valor Real
        'KMF', // ->    COMOROS (THE)                                                   Comorian Franc
        'CDF', // ->    CONGO (THE DEMOCRATIC REPUBLIC OF THE)                          Congolese Franc
        'CRC', // ->    COSTA RICA                                                      Costa Rican Colon
        'HRK', // ->    CROATIA                                                         Kuna
        'CUP', // ->    CUBA                                                            Cuban Peso
        'CUC', // ->    CUBA                                                            Peso Convertible
        'ANG', // ->    CURAÇAO                                                         Netherlands Antillean Guilder
        'CZK', // ->    CZECHIA                                                         Czech Koruna
        'DKK', // ->    DENMARK                                                         Danish Krone
        'DJF', // ->    DJIBOUTI                                                        Djibouti Franc
        'DOP', // ->    DOMINICAN REPUBLIC (THE)                                        Dominican Peso
        'EGP', // ->    EGYPT                                                           Egyptian Pound
        'SVC', // ->    EL SALVADOR                                                     El Salvador Colon
        'ERN', // ->    ERITREA                                                         Nakfa
        'SZL', // ->    ESWATINI                                                        Lilangeni
        'ETB', // ->    ETHIOPIA                                                        Ethiopian Birr
        'FKP', // ->    FALKLAND ISLANDS (THE) [MALVINAS]                               Falkland Islands Pound
        'FJD', // ->    FIJI                                                            Fiji Dollar
        'XPF', // ->    FRENCH POLYNESIA                                                CFP Franc
        'GMD', // ->    GAMBIA (THE)                                                    Dalasi
        'GEL', // ->    GEORGIA                                                         Lari
        'GHS', // ->    GHANA                                                           Ghana Cedi
        'GIP', // ->    GIBRALTAR                                                       Gibraltar Pound
        'GTQ', // ->    GUATEMALA                                                       Quetzal
        'GBP', // ->    GUERNSEY                                                        Pound Sterling
        'GNF', // ->    GUINEA                                                          Guinean Franc
        'GYD', // ->    GUYANA                                                          Guyana Dollar
        'HTG', // ->    HAITI                                                           Gourde
        'HNL', // ->    HONDURAS                                                        Lempira
        'HKD', // ->    HONG KONG                                                       Hong Kong Dollar
        'HUF', // ->    HUNGARY                                                         Forint
        'ISK', // ->    ICELAND                                                         Iceland Krona
        'IDR', // ->    INDONESIA                                                       Rupiah
        'XDR', // ->    INTERNATIONAL MONETARY FUND (IMF)                               SDR (Special Drawing Right)
        'IRR', // ->    IRAN (ISLAMIC REPUBLIC OF)                                      Iranian Rial
        'IQD', // ->    IRAQ                                                            Iraqi Dinar
        'ILS', // ->    ISRAEL                                                          New Israeli Sheqel
        'JMD', // ->    JAMAICA                                                         Jamaican Dollar
        'JPY', // ->    JAPAN                                                           Yen
        'JOD', // ->    JORDAN                                                          Jordanian Dinar
        'KZT', // ->    KAZAKHSTAN                                                      Tenge
        'KES', // ->    KENYA                                                           Kenyan Shilling
        'KPW', // ->    KOREA (THE DEMOCRATIC PEOPLE’S REPUBLIC OF)                     North Korean Won
        'KRW', // ->    KOREA (THE REPUBLIC OF)                                         Won
        'KWD', // ->    KUWAIT                                                          Kuwaiti Dinar
        'KGS', // ->    KYRGYZSTAN                                                      Som
        'LAK', // ->    LAO PEOPLE’S DEMOCRATIC REPUBLIC (THE)                          Lao Kip
        'LBP', // ->    LEBANON                                                         Lebanese Pound
        'LSL', // ->    LESOTHO                                                         Loti
        'ZAR', // ->    LESOTHO                                                         Rand
        'LRD', // ->    LIBERIA                                                         Liberian Dollar
        'LYD', // ->    LIBYA                                                           Libyan Dinar
        'CHF', // ->    LIECHTENSTEIN                                                   Swiss Franc
        'MOP', // ->    MACAO                                                           Pataca
        'MKD', // ->    NORTH MACEDONIA                                                 Denar
        'MGA', // ->    MADAGASCAR                                                      Malagasy Ariary
        'MWK', // ->    MALAWI                                                          Malawi Kwacha
        'MYR', // ->    MALAYSIA                                                        Malaysian Ringgit
        'MVR', // ->    MALDIVES                                                        Rufiyaa
        'MRU', // ->    MAURITANIA                                                      Ouguiya
        'MUR', // ->    MAURITIUS                                                       Mauritius Rupee
        'XUA', // ->    MEMBER COUNTRIES OF THE AFRICAN DEVELOPMENT BANK GROUP          ADB Unit of Account
        'MXN', // ->    MEXICO                                                          Mexican Peso
        'MXV', // ->    MEXICO                                                          Mexican Unidad de Inversion (UDI)
        'MDL', // ->    MOLDOVA (THE REPUBLIC OF)                                       Moldovan Leu
        'MNT', // ->    MONGOLIA                                                        Tugrik
        'MAD', // ->    MOROCCO                                                         Moroccan Dirham
        'MZN', // ->    MOZAMBIQUE                                                      Mozambique Metical
        'MMK', // ->    MYANMAR                                                         Kyat
        'NAD', // ->    NAMIBIA                                                         Namibia Dollar
        'NPR', // ->    NEPAL                                                           Nepalese Rupee
        'NZD', // ->    COOK ISLANDS (THE)                                              New Zealand Dollar
        'NIO', // ->    NICARAGUA                                                       Cordoba Oro
        'NGN', // ->    NIGERIA                                                         Naira
        'OMR', // ->    OMAN                                                            Rial Omani
        'PKR', // ->    PAKISTAN                                                        Pakistan Rupee
        'PAB', // ->    PANAMA                                                          Balboa
        'PGK', // ->    PAPUA NEW GUINEA                                                Kina
        'PYG', // ->    PARAGUAY                                                        Guarani
        'PEN', // ->    PERU                                                            Sol
        'PHP', // ->    PHILIPPINES (THE)                                               Philippine Peso
        'PLN', // ->    POLAND                                                          Zloty
        'QAR', // ->    QATAR                                                           Qatari Rial
        'RON', // ->    ROMANIA                                                         Romanian Leu
        'RUB', // ->    RUSSIAN FEDERATION (THE)                                        Russian Ruble
        'RWF', // ->    RWANDA                                                          Rwanda Franc
        'SHP', // ->    SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA                    Saint Helena Pound
        'WST', // ->    SAMOA                                                           Tala
        'STN', // ->    SAO TOME AND PRINCIPE                                           Dobra
        'SAR', // ->    SAUDI ARABIA                                                    Saudi Riyal
        'RSD', // ->    SERBIA                                                          Serbian Dinar
        'SCR', // ->    SEYCHELLES                                                      Seychelles Rupee
        'SLL', // ->    SIERRA LEONE                                                    Leone
        'SGD', // ->    SINGAPORE                                                       Singapore Dollar
        'XSU', // ->    SISTEMA UNITARIO DE COMPENSACION REGIONAL DE PAGOS "SUCRE"      Sucre
        'SBD', // ->    SOLOMON ISLANDS                                                 Solomon Islands Dollar
        'SOS', // ->    SOMALIA                                                         Somali Shilling
        'SSP', // ->    SOUTH SUDAN                                                     South Sudanese Pound
        'LKR', // ->    SRI LANKA                                                       Sri Lanka Rupee
        'SDG', // ->    SUDAN (THE)                                                     Sudanese Pound
        'SRD', // ->    SURINAME                                                        Surinam Dollar
        'SEK', // ->    SWEDEN                                                          Swedish Krona
        'CHE', // ->    SWITZERLAND                                                     WIR Euro
        'CHW', // ->    SWITZERLAND                                                     WIR Franc
        'SYP', // ->    SYRIAN ARAB REPUBLIC                                            Syrian Pound
        'TWD', // ->    TAIWAN (PROVINCE OF CHINA)                                      New Taiwan Dollar
        'TJS', // ->    TAJIKISTAN                                                      Somoni
        'TZS', // ->    TANZANIA, UNITED REPUBLIC OF                                    Tanzanian Shilling
        'THB', // ->    THAILAND                                                        Baht
        'TOP', // ->    TONGA                                                           Pa’anga
        'TTD', // ->    TRINIDAD AND TOBAGO                                             Trinidad and Tobago Dollar
        'TND', // ->    TUNISIA                                                         Tunisian Dinar
        'TRY', // ->    TURKEY                                                          Turkish Lira
        'TMT', // ->    TURKMENISTAN                                                    Turkmenistan New Manat
        'UGX', // ->    UGANDA                                                          Uganda Shilling
        'UAH', // ->    UKRAINE                                                         Hryvnia
        'AED', // ->    UNITED ARAB EMIRATES (THE)                                      UAE Dirham
        'USN', // ->    UNITED STATES OF AMERICA (THE)                                  US Dollar (Next day)
        'UYU', // ->    URUGUAY                                                         Peso Uruguayo
        'UYI', // ->    URUGUAY                                                         Uruguay Peso en Unidades Indexadas (UI)
        'UYW', // ->    URUGUAY                                                         Unidad Previsional
        'UZS', // ->    UZBEKISTAN                                                      Uzbekistan Sum
        'VUV', // ->    VANUATU                                                         Vatu
        'VES', // ->    VENEZUELA (BOLIVARIAN REPUBLIC OF)                              Bolívar Soberano
        'VND', // ->    VIET NAM                                                        Dong
        'YER', // ->    YEMEN                                                           Yemeni Rial
        'ZMW', // ->    ZAMBIA                                                          Zambian Kwacha
        'ZWL', // ->    ZIMBABWE                                                        Zimbabwe Dollar
        'XBA', // ->    ZZ01_Bond Markets Unit European_EURCO                           Bond Markets Unit European Composite Unit (EURCO)
        'XBB', // ->    ZZ02_Bond Markets Unit European_EMU-6                           Bond Markets Unit European Monetary Unit (E.M.U.-6)
        'XBC', // ->    ZZ03_Bond Markets Unit European_EUA-9                           Bond Markets Unit European Unit of Account 9 (E.U.A.-9)
        'XBD', // ->    ZZ04_Bond Markets Unit European_EUA-17                          Bond Markets Unit European Unit of Account 17 (E.U.A.-17)
        'XTS', // ->    ZZ06_Testing_Code                                               Codes specifically reserved for testing purposes
        'XXX', // ->    ZZ07_No_Currency                                                The codes assigned for transactions where no currency is involved
        'XAU', // ->    ZZ08_Gold                                                       Gold
        'XPD', // ->    ZZ09_Palladium                                                  Palladium
        'XPT', // ->    ZZ10_Platinum                                                   Platinum
        'XAG', // ->    ZZ11_Silver                                                     Silver
    ];

    /**
     * Valida si el valor introducido es admitido o soportado
     * @param {'L' | 'R' | 'C' | 'F' | 'D'} judge tipo de forma a filtrar
     * @param {string} target dato a valorar
     */
    isValid(judge, target = 'l') {
        if (!target && typeof target !== 'string') return false;

        judge = judge.toLowerCase(judge);
        target = target.trim(target);
        if (judge != 'c' && judge != 'd') target = target.toLowerCase(target);
        const vGlobal =
            judge === 'l'
                ? 'availableLangs'
                : judge === 'r'
                ? 'availableRegions'
                : judge === 'c'
                ? 'availableCurrency'
                : judge == 'f'
                ? 'availableFormat'
                : judge == 'd'
                ? 'availableCurrencyDisplay'
                : false;
        const listAvailable = CurrencyManager[vGlobal] || [];
        const isOk = vGlobal ? listAvailable.indexOf(target) > -1 : vGlobal;
        if (!isOk) console.error("'" + target + "' Not found in", vGlobal);
        return isOk;
    }

    /**
     * Genera un formato para el valor enviado _Por defecto __Estados Unidos___
     * @param  {string|Number} cantidad monto a generar
     * @param  {string} lang Idioma a traducir
     * @param  {string} region Código de referencia de país para formato 2 caracteres
     */
    localCurrency(cantidad, lang = 'en', currency = 'US') {
        if (cantidad && currency && lang) {
            if (!this.isValid('l', lang) || !this.isValid('c', currency)) return;

            const options = { style: 'currency', currency, currencyDisplay: CurrencyManager.availableCurrencyDisplay[0] };
            const format = `${lang}-EN`;
            cantidad = new Intl.NumberFormat(format, { ...options }).format(cantidad);

            return cantidad;
        }

        console.error('Algunos campos son requeridos:', 'cantidad,', 'currency,', 'lang.');
        return;
    }
}
