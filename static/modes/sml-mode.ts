// Copyright (c) 2017, Compiler Explorer Authors
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
import * as monaco from 'monaco-editor';

function definition(): monaco.languages.IMonarchLanguage {
    return {
        keywords: [
            'abstype',
            'and',
            'andalso',
            'case',
            'datatype',
            'else',
            'end',
            'fn',
            'fun',
            'functor',
            'if',
            'in',
            'infix',
            'infixr',
            'let',
            'local',
            'nonfix',
            'op',
            'open',
            'orelse',
            'raise',
            'rec',
            'sig',
            'signature',
            'struct',
            'structure',
            'then',
            'type',
            'val',
        ],

        builtintypes: ['unit','bool','int','char','string','option','list'],

        operators: ['+', '-', '*', '/', 'div', 'mod', '~', '=', '<>', '<', '<=', '>', '>=', '::', '@', ':='],

        numbers: /-?\d+(\.\d+)?/,

        tokenizer: {
            root: [
                // identifiers and keywords
                [
                    /[a-z_$][\w$]*/,
                    {
                        cases: {
                            '@builtintypes': 'builtintypes',
                            '@keywords': 'keyword',
                            '@default': 'identifier',
                        },
                    },
                ],

                {include: '@whitespace'},

                [/@numbers/, 'number'],

                [/[+\-*/=<>$@^|&!~:]/, 'operators'],

                [/\b(div|mod)\b/, 'operators'],

                [/(")(.*)(")/, ['string', 'string', 'string']],
            ],


            comment: [
                [/[^(*]+/, 'comment'],
                [/\*\)/, 'comment', '@pop'],
            ],

            whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/\(\*/, 'comment', '@comment'],
            ],

        },
    };
}

monaco.languages.register({id: 'sml'});
monaco.languages.setMonarchTokensProvider('sml', definition());

export {};
