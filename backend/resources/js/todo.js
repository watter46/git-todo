let command = null;

const setTaskCommand = () => command = "- [ ] ";

const getTaskCommand = () => "- [ ] ";

const addTask = () => {
    // コマンドを保存
    setTaskCommand();

    const textarea_element = document.getElementById("editor_textarea")
    const textarea         = textarea_element.value;

    const position     = textarea_element.selectionStart;
    const length       = textarea.length;
    const before_lines = textarea.substr(0, position);
    const after_lines  = textarea.substr(position, length);
    const split_text   = before_lines.split(/\r\n|\n/);
    const last_line    = split_text.slice(-1)[0];
    const trimed_last  = last_line.trimStart();

    /* すでにコマンドが存在していた場合 */
    if (trimed_last.startsWith(getTaskCommand()))
    {
        const result = before_lines + '\n\n' + getTaskCommand() + after_lines;

        textarea_element.value = result;

        /* キャレットの位置を指定(2回改行する必要があるため + 2) */
        const caret_position = position + getTaskCommand().length + 2
        textarea_element.focus()
        textarea_element.setSelectionRange(caret_position, caret_position)
        return;
    }

    /* キャレットの後ろに文字が存在しない場合 */
    if (!after_lines)
    {
        /* キャレットの後ろに文字が存在しない && 1行目 */
        if (split_text.length === 1)
        {
            /* キャレットの後ろに文字が存在しない && 1行目 &&　先頭 */
            if (!before_lines)
            {
                const result = getTaskCommand();

                textarea_element.value = result;
            }

            /* キャレットの後ろに文字が存在しない && 1行目 &&　先頭ではない */
            if (before_lines)
            {
                const result = before_lines + '\n\n' + getTaskCommand();

                textarea_element.value = result;
            }

            /* キャレットの位置を指定 */
            textarea_element.focus()
        }

        /* キャレットの後ろに文字が存在しない && 1行目ではない */
        if (!(split_text.length === 1))
        {
            const result = before_lines + '\n' + getTaskCommand();

            textarea_element.value = result;

            /* キャレットを最後尾に指定 */
            textarea_element.focus()
        }
    }

    /* キャレットの後ろに文字が存在する場合 */
    if (after_lines)
    {
        /* キャレットの後ろに文字が存在する場合 && 1行目 */
        if (split_text.length === 1)
        {
            /* キャレットの後ろに文字が存在する場合 && 1行目 && 先頭 */
            if (!before_lines)
            {
                const result = getTaskCommand() + '\n' + after_lines;

                textarea_element.value = result;

                /* キャレットの位置を指定 */
                const caret_position = position + getTaskCommand().length
                textarea_element.focus()
                textarea_element.setSelectionRange(caret_position, caret_position)
            }

            /* キャレットの後ろに文字が存在する場合 && 1行目 && 先頭ではない */
            if (before_lines)
            {
                /* キャレットの後ろに文字が存在する場合 && 1行目 && 先頭ではない &&
                　 キャレットと文字列の間にスペース(半角、全角)が無い場合 */
                if(/[^( |　)]+$/.test(before_lines))
                {
                    const result = getTaskCommand() + before_lines + '\n' + after_lines;
                    textarea_element.value = result;

                    /* キャレットの位置を指定 */
                    const caret_position = position + getTaskCommand().length
                    textarea_element.focus()
                    textarea_element.setSelectionRange(caret_position, caret_position)
                }

                /* キャレットの後ろに文字が存在する場合 && 1行目 && 先頭ではない &&
                　 キャレットと文字列の間にスペース(半角、全角)がある場合 */
                if(/[( |　)]+$/.test(before_lines))
                {
                    const result = before_lines + '\n\n' + getTaskCommand() + '\n' + after_lines;

                    textarea_element.value = result;

                    /* キャレットの位置を指定(2回改行する必要があるため + 2) */
                    const caret_position = position + getTaskCommand().length + 2
                    textarea_element.focus()
                    textarea_element.setSelectionRange(caret_position, caret_position)
                }
            }
        }

        /* キャレットの後ろに文字が存在する場合 && 1行目ではない */
        if (!(split_text.length === 1))
        {
            /* キャレットの後ろに文字が存在する場合 && 1行目ではない &&
               キャレットと文字列の間にスペース(半角、全角)が無い場合 */
            if(/[^( |　)]+$/.test(before_lines))
            {
                const split_before     = [...split_text]
                split_before.pop();
                const new_before_lines = split_before.join().replace(/,/g, '\n');
                const result = new_before_lines + '\n\n' + getTaskCommand() + last_line + '\n' + after_lines;

                textarea_element.value = result;

                /* キャレットを最後尾に指定(改行するため+1) */
                const caret_position = position + getTaskCommand().length + 1
                textarea_element.focus()
                textarea_element.setSelectionRange(caret_position, caret_position)
            }

            /* キャレットの後ろに文字が存在する場合 && 1行目ではない &&
               キャレットと文字列の間にスペース(半角、全角)がある場合 */
            if(/[( |　)]+$/.test(before_lines))
            {
                const result = before_lines + '\n\n' + getTaskCommand() + '\n' + after_lines;

                textarea_element.value = result;

                /* キャレットの位置を指定(2回改行する必要があるため + 2) */
                const caret_position = position + getTaskCommand().length + 2
                textarea_element.focus()
                textarea_element.setSelectionRange(caret_position, caret_position)
            }
        }
    }
}

/* Ctrl + [ でコマンドを実行する */
const addTaskCommandExecute = (e) => {
    if (e.ctrlKey && e.key === "[") {
        addTask()
    }
}


const textarea_element = document.getElementById("editor_textarea");

/* Enterが押された時の処理 */
textarea_element.addEventListener('keydown', addTaskCommandExecute, false);

export {addTask}