import hljs from 'highlight.js/lib/common';

import clojure from 'highlight.js/lib/languages/clojure';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import groovy from 'highlight.js/lib/languages/groovy';
import http from 'highlight.js/lib/languages/http';
import scala from 'highlight.js/lib/languages/scala';
import vim from 'highlight.js/lib/languages/vim';

import 'highlight.js/styles/github.css';
import { enableCodeCopy } from './roq-clipboard.js';
import './_hljs-dark.css';

hljs.registerLanguage('clojure', clojure);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('groovy', groovy);
hljs.registerLanguage('http', http);
hljs.registerLanguage('scala', scala);
hljs.registerLanguage('vim', vim);
// hljs.registerLanguage('fennel', fennel); no fennel support

hljs.registerAliases(['git_config', 'gitconfig'], { languageName: 'ini' });

function addLanguageLabels() {
    document.querySelectorAll('pre > code.hljs').forEach(function (code) {
        var pre = code.parentElement;
        if (pre.querySelector('.code-lang')) return;
        var lang = code.getAttribute('data-lang') ||
            (code.className.match(/\blanguage-([\w-]+)\b/) || [])[1];
        if (!lang) return;
        var label = document.createElement('span');
        label.className = 'code-lang';
        label.textContent = lang;
        pre.classList.add('has-lang');
        pre.appendChild(label);
    });
}

hljs.highlightAll();
enableCodeCopy();
addLanguageLabels();
