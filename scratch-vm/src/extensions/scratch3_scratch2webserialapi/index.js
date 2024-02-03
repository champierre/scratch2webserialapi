const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAO5lWElmTU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgExAAIAAAAGAAAAZgE7AAIAAAAPAAAAbIdpAAQAAAABAAAAfAAAAAAAAABgAAAAAQAAAGAAAAABQ2FudmEASnVueWEgSXNoaWhhcmEAAAAEkoYABwAAADsAAACyoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAooAMABAAAAAEAAAAoAAAAAEFTQ0lJAAAAeHI6ZDpEQUY3c05rcUljZzo0LGo6MTY4NTg4OTYzNzQyNTQxODM4OCx0OjI0MDIwMzAxAP2FOHgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAZvaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6QXR0cmliPSJodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+Q2FudmE8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPGRjOmNyZWF0b3I+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpPkp1bnlhIElzaGloYXJhPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC9kYzpjcmVhdG9yPgogICAgICAgICA8ZGM6dGl0bGU+CiAgICAgICAgICAgIDxyZGY6QWx0PgogICAgICAgICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPldlYlNlcmlhbEFQSSAtIDE8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QWx0PgogICAgICAgICA8L2RjOnRpdGxlPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj45NjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+OTY8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDxBdHRyaWI6QWRzPgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICAgICAgICAgICAgICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTAyLTAzPC9BdHRyaWI6Q3JlYXRlZD4KICAgICAgICAgICAgICAgICAgPEF0dHJpYjpFeHRJZD40ODM2N2UxYi02YzU1LTRiYTctYTE0OC02OWI3ODU1NDM1NWY8L0F0dHJpYjpFeHRJZD4KICAgICAgICAgICAgICAgICAgPEF0dHJpYjpGYklkPjUyNTI2NTkxNDE3OTU4MDwvQXR0cmliOkZiSWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwvQXR0cmliOkFkcz4KICAgICAgICAgPGV4aWY6VXNlckNvbW1lbnQ+CiAgICAgICAgICAgIDxyZGY6QWx0PgogICAgICAgICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPnhyOmQ6REFGN3NOa3FJY2c6NCxqOjE2ODU4ODk2Mzc0MjU0MTgzODgsdDoyNDAyMDMwMTwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpBbHQ+CiAgICAgICAgIDwvZXhpZjpVc2VyQ29tbWVudD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CqGH1c0AAARbSURBVFgJ7VZLKH5bFF8fIpRXJEIoAxOJGJAyYCaFREw8CiMmioFirshjJgYS5VGkGCgZKO+SMpA88gp5P/K27/6t/12ncz637u37umVwVu2zz16vs9ZvrbW/z6E00S8mj18cG4dmB+huhWwEbQTdRcBde7sHbQTdRcBd+/+9B7+/v+m//txDz1nXoRmWPwtwaCaHw0FY7hI+44ofC4Jw4uHhYVmuOJVk4O/4+JheX185OCcsRI13yG5vb+n+/t7CB6RMGjneT09P1ezsrJqcnFTb29tK+Ob96+tLYZkJctH5+Phg0draGqqjuru7+Sw6Yi9nCHUSKiUlRdXV1bGuPDhA+djS0hI7hFNZra2tovsjKAgkKFEyny8vL1VnZ6fa2tpisXxHdLELDwEmJSWpmpoas1h56ROX9O3tjaqrqyk3N5eGh4fJ39+flpeXydvbmyHXH2a9l5cXOjk5YXlkZKTRV3d3dywPCAjgsnp5eVFERARVVlaSn58f+0D7gM7Ozujp6YnCwsIoODiYeXh4enoa/gymZPzw8MColZaWKt0HliwkS5RcGxqrt7fXQLChoUE1Nzerqakplg8NDSmdCL+PjY2xv729PZWRkWHYw9fq6irLdOIqOTlZ1dbWWr7NJZYgBwcHDeOBgQF1eHhoKOsGZhlK/vz8rDY3N/m8srLCOi0tLXwuLy9Xi4uLSiOqDg4OmDc+Ps46R0dHqqurS2kEeaWnp6u0tDQu8/v7u0pMTPwRoGWKy8rKaG5ujgoKCqiqqopiY2NpZGSE0dYB8Z6VlUUabS4xGGgDkJSvvb2dMjMzKTAwkPSwsAzlBkVHR1N9fT3pitDOzg7FxMSQHiR6fHzk8n5+frKe+cEB4irRKbJSTk4OB7W+vk5FRUWEoC8uLgi9B+ro6KCEhAQqLCyk+Ph4Cg0NZb44R2DwBZIrCgGBzs/PqaSkhANdWFgwkhJ9JIlelzNsODUw4EyXlMLDw8nX15dSU1OpoqKCJiYmOEMMBKitrY10WfgdD3Emw4RgJDBRkrNuGxodHSUMFBLp6enhMwKTGDBQog97L5lOff9RXFwcFRcXc2CYaqAEwjRiwuBU9w3pviNM68bGBuXl5TFf9yXrmp1L8IKu7jPW2d3dpaurKy43GJDDf0hICPX19VFjYyNFRUX9SV4GRAek5ufnVX5+Pje2tlP62lH7+/v6O38IU4l7CjIsXS6ly89CXXqlg1X6+hB1Y0hmZmaYB1/Z2dls29TUpDDp+lpT19fXLJ+enmZZf38/n3F78G+xPhmwAlEMASgoKIh3yEGCDkqEdyAKghylxY6BED34EnRQRvBRGaANtEA4oz3E5ubmhnx8fIwhtPxZkHKz5d8PM8+ciOj8E09kzruzrvPZWR9nS4BgwMhMkpnwzHKzTPhmHmycg3DW+zf5jwAlkN+yWy7q3xKUOQ47QDMarrzbCLqCmtnGRtCMhivvNoKuoGa2sRE0o+HK+1+1z9JZ9soXPQAAAABJRU5ErkJggg==';
const formatMessage = require('format-message');

const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;

const Message = {
    connect: {
        'ja': '接続',
        'ja-Hira': 'せつぞく',
        'en': 'connect',
        'ko': '연결'
    },
    disconnect: {
        'ja': '切断',
        'ja-Hira': 'せつだん',
        'en': 'disconnect',
        'ko': '연결 해제'
    },
    send: {
        'ja': '[MSG]を送る',
        'ja-Hira': '[MSG]をおくる',
        'en': 'send [MSG]',
        'ko': '[MSG] 보내기'
    },

}

const AvailableLocales = ['en', 'ja', 'ja-Hira', 'ko'];

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL = 'https://champierre.github.io/scratch2webserialapi/scratch2webserialapi.mjs';

class Scratch3Scratch2WebSerialAPIBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME() {
        return 'Scratch2WebSerialAPI';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID() {
        return 'scratch2webserialapi';
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    static get extensionURL() {
        return extensionURL;
    }

    /**
     * Set URL to get this extension.
     * extensionURL will be reset when the module is loaded from the web.
     * @param {string} url - URL
     */
    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {
        this.runtime = runtime;
        this.port = '';
    }

    getInfo() {
        this.locale = this.setLocale();

        return {
            id: Scratch3Scratch2WebSerialAPIBlocks.EXTENSION_ID,
            name: Scratch3Scratch2WebSerialAPIBlocks.EXTENSION_NAME,
            extensionURL: Scratch3Scratch2WebSerialAPIBlocks.extensionURL,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'connect',
                    blockType: BlockType.COMMAND,
                    text: Message.connect[this.locale]
                },
                {
                    opcode: 'disconnect',
                    blockType: BlockType.COMMAND,
                    text: Message.disconnect[this.locale]
                },
                {
                    opcode: 'send',
                    blockType: BlockType.COMMAND,
                    text: Message.send[this.locale],
                    arguments: {
                        MSG: {
                            type: ArgumentType.STRING,
                            defaultValue: 'test'
                        }
                    }
                }
            ],
            menus: {
            }
        };
    }

    async connect() {
        console.log('connect');
        if ('serial' in navigator) {
            try {
                this.port = await navigator.serial.requestPort();
                await this.port.open({ baudRate: 115200 });
                alert('Connected to the serial port');
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('Web Serial API not supported.');
        }
    }

    async disconnect() {
        console.log('disconnect');
        if ('serial' in navigator) {
            if (this.port && this.port.close) {
                await this.port.close();
                port = null;
                alert('Disconnected from the serial port');
            } else {
                console.error('No active serial connection to disconnect');
            }
        } else {
            console.error('Web Serial API not supported.');
        }
    }

    async send(args) {
        console.log(args.MSG);
        if (this.port && this.port.writable) {
            const writer = this.port.writable.getWriter();
            const data = new TextEncoder().encode(args.MSG);
            await writer.write(data);
            writer.releaseLock();
        }
    }

    /**
     * Get locale for message text.
     * @return {string} - Locale of this editor.
     */
    setLocale() {
        const locale = formatMessage.setup().locale;
        if (AvailableLocales.includes(locale)) {
            return locale;
        }
        return 'en';
    }
}

exports.blockClass = Scratch3Scratch2WebSerialAPIBlocks; // loadable-extension needs this line.
module.exports = Scratch3Scratch2WebSerialAPIBlocks;
