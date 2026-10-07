/*
 * Единый список поисковиков и ИИ-сервисов.
 * Правьте только этот файл: изменения применятся и на стартовой странице (start.html),
 * и в выпадающем списке адресной строки (index.html).
 *
 * Поисковик: { id, name, region, domain, url: q => '...' }  // q уже закодирован (encodeURIComponent)
 * ИИ-сервис:  { id, name, domain, home, url: q => '...' }
 *   - если у ИИ нет параметра для запроса в URL — не указывайте url:
 *     тогда откроется home, а текст запроса будет скопирован в буфер обмена (останется нажать Ctrl+V).
 */
(function () {
  window.ORS_ENGINES = [
    { id:'google',      name:'Google',       region:'Мир',    domain:'google.com',        url:q => `https://www.google.com/search?q=${q}` },
    { id:'bing',        name:'Bing',         region:'Мир',    domain:'bing.com',           url:q => `https://www.bing.com/search?q=${q}` },
    { id:'ddg',         name:'DuckDuckGo',   region:'Мир',    domain:'duckduckgo.com',     url:q => `https://duckduckgo.com/?q=${q}` },
    { id:'brave',       name:'Brave Search', region:'Мир',    domain:'search.brave.com',   url:q => `https://search.brave.com/search?q=${q}` },
    { id:'startpage',   name:'Startpage',    region:'Мир',    domain:'startpage.com',      url:q => `https://www.startpage.com/sp/search?query=${q}` },
    { id:'mojeek',      name:'Mojeek',       region:'Мир',    domain:'mojeek.com',         url:q => `https://www.mojeek.com/search?q=${q}` },
    { id:'kagi',        name:'Kagi',         region:'Мир',    domain:'kagi.com',           url:q => `https://kagi.com/search?q=${q}` },
    { id:'yahoo',       name:'Yahoo',        region:'Мир',    domain:'search.yahoo.com',   url:q => `https://search.yahoo.com/search?p=${q}` },
    { id:'yandex',      name:'Яндекс',       region:'РФ',     domain:'yandex.ru',          url:q => `https://yandex.ru/search/?text=${q}` },
    { id:'mailru',      name:'Mail.ru',      region:'РФ',     domain:'mail.ru',            url:q => `https://go.mail.ru/search?q=${q}` },
    { id:'rambler',     name:'Rambler',      region:'РФ',     domain:'rambler.ru',         url:q => `https://nova.rambler.ru/search?query=${q}` },
    { id:'gogo',        name:'Gogo.ru',      region:'РФ',     domain:'gogo.ru',            url:q => `https://gogo.ru/search?q=${q}` },
    { id:'qwant',       name:'Qwant',        region:'Европа', domain:'qwant.com',          url:q => `https://www.qwant.com/?q=${q}` },
    { id:'ecosia',      name:'Ecosia',       region:'Европа', domain:'ecosia.org',         url:q => `https://www.ecosia.org/search?q=${q}` },
    { id:'seznam',      name:'Seznam',       region:'Европа', domain:'seznam.cz',          url:q => `https://search.seznam.cz/?q=${q}` },
    { id:'swisscows',   name:'Swisscows',    region:'Европа', domain:'swisscows.com',      url:q => `https://swisscows.com/en/web?query=${q}` },
    { id:'baidu',       name:'Baidu',        region:'Азия',   domain:'baidu.com',          url:q => `https://www.baidu.com/s?wd=${q}` },
    { id:'naver',       name:'Naver',        region:'Азия',   domain:'naver.com',          url:q => `https://search.naver.com/search.naver?query=${q}` },
    { id:'sogou',       name:'Sogou',        region:'Азия',   domain:'sogou.com',          url:q => `https://www.sogou.com/web?query=${q}` },
    { id:'coccoc',      name:'Coc Coc',      region:'Азия',   domain:'coccoc.com',         url:q => `https://coccoc.com/search?query=${q}` }
  ];

  window.ORS_AI = [
    { id:'googleai',  name:'Google AI',  domain:'google.com',            home:'https://www.google.com/search?udm=50',  url:q => `https://www.google.com/search?udm=50&q=${q}` },
    { id:'chatgpt',   name:'ChatGPT',    domain:'chatgpt.com',           home:'https://chatgpt.com/',                  url:q => `https://chatgpt.com/?q=${q}` },
    { id:'claude',    name:'Claude',     domain:'claude.ai',             home:'https://claude.ai/new',                 url:q => `https://claude.ai/new?q=${q}` },
    { id:'gemini',    name:'Gemini',     domain:'gemini.google.com',     home:'https://gemini.google.com/app' },
    { id:'copilot',   name:'Copilot',    domain:'copilot.microsoft.com', home:'https://copilot.microsoft.com/',        url:q => `https://copilot.microsoft.com/?q=${q}` },
    { id:'grok',      name:'Grok',       domain:'grok.com',              home:'https://grok.com/',                     url:q => `https://grok.com/?q=${q}` },
    { id:'deepseek',  name:'DeepSeek',   domain:'deepseek.com',          home:'https://chat.deepseek.com/' },
    { id:'mistral',   name:'Le Chat',    domain:'mistral.ai',            home:'https://chat.mistral.ai/chat',          url:q => `https://chat.mistral.ai/chat?q=${q}` },
    { id:'alice',     name:'Алиса',      domain:'alice.yandex.ru',       home:'https://alice.yandex.ru/' },
    { id:'gigachat',  name:'GigaChat',   domain:'giga.chat',             home:'https://giga.chat/' }
  ];

  // Куда вести пользователя для выбранного ИИ: { url, copy }.
  // copy — текст, который нужно положить в буфер обмена (если ИИ не принимает запрос через URL).
  window.orsAiTarget = function (ai, query) {
    const q = String(query || '').trim();
    if (!q) return { url: ai.home, copy: null };
    if (typeof ai.url === 'function') return { url: ai.url(encodeURIComponent(q)), copy: null };
    return { url: ai.home, copy: q };
  };

  window.orsFavicon = function (domain) {
    return 'https://www.google.com/s2/favicons?sz=64&domain=' + encodeURIComponent(domain);
  };
})();
