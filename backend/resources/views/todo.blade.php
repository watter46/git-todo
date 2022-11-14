<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>Document</title>
    <style>
        html
        {
            height: 100%;
        }
    </style>
</head>
<body class="h-full bg-green-400">
    <div class="h-3/6 grid grid-cols-1 content-center">
        <div class="flex justify-center">
            <form class="w-4/6">
                {{-- Title Input --}}
                <div class="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                    <div class="relative">
                        <input type="text" id="title_input" class="block px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-800 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label for="small_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Title</label>
                        </div>
                </div>

                <div class="mb-4 w-full bg-gray-50 rounded-b-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                    <div class="flex justify-end items-center py-2 px-3 border-b dark:border-gray-600">
                        <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                            <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
                                <button type="button"
                                        class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                        onclick="todo.addBulleted()">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <span class="sr-only">Add bulletList</span>
                                </button>
                                <button type="button"
                                        class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                        onclick="addTask()">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                    <span class="sr-only">Add list</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="py-2 px-4 bg-white rounded-b-lg dark:bg-gray-800">
                        <label for="editor" class="sr-only">Publish post</label>
                        <textarea id="editor_textarea" rows="8" class="block px-0 w-full text-sm text-gray-800 bg-white focus:outline-none border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write an article..." required=""></textarea>
                    </div>
                </div>
                <div class="flex justify-end">
                    <button type="submit"
                            class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-900 hover:bg-gray-800"
                            onclick="todo.onPost()">
                        Publish post
                    </button>
                </div>
            </form>
        </div>
    </div>

<script>
    let command = null;

    setTaskCommand = () => {
        command = "- [ ] ";
    }

    getTaskCommand = () => {
        return "- [ ] ";
    }

    //関数の実行
    addTask = () => {
        // コマンドを保存
        setTaskCommand();

        const textarea_element = document.getElementById("editor_textarea")
        const textarea_value   = textarea_element.value;

        if (textarea_value)
        {
            textarea_element.value = textarea_value + '\n' + getTaskCommand();
            textarea_element.focus()
        }

        /* textareaに文字がないとき */
        if (!textarea_value)
        {
            textarea_element.value = textarea_value + getTaskCommand();
            textarea_element.focus()
        }
    }

    enter_handle = () => {
        // Enterキーを有効にする
        offPreventEvent();
        if (!(event.code === "Enter")) {
            // Enter以外を押すとコマンドを解除する
            command = null;
        }

        // カーソルの上の行を取得する
        if ( event.code === "Enter")
        {
            const textarea_element = document.getElementById("editor_textarea");

            const textarea = textarea_element.value;
            
            // 各行を切り出して配列にする
            const textarea_split = textarea.split(/\r\n|\n/);
            
            // 最終行(配列の末尾取得)
            const last_line  = textarea_split.slice(-1)[0]

            // カーソルの位置を取得する
            const pos = textarea_element.selectionStart
            // console.log(pos)

            const before = textarea.substr(0, pos)
            console.log(before)

            // 最終行がコマンドのみではない場合の処理
            if (!(last_line === getTaskCommand())) {
                console.log("コマンド出ない")

                // 先頭にコマンドがある場合
                if (last_line.substr(0, 6) === getTaskCommand())
                {
                    addTask()
                    onPreventEvent()
                }
            }

            // 最終行がコマンドのみの場合の処理
            if (  last_line === getTaskCommand() )
            {
                // テキストエリアにコマンド以外もある場合
                if (!(textarea === last_line))
                {
                    textarea_split.pop()
                    const join    = textarea_split.join()
                    const replace = join.replace(/,/g, '\n')
                    const result  = replace + '\n'

                    document.getElementById("editor_textarea").value = result;
                    // Enterキーを無効にして改行させない コマンドのみなので削除
                    onPreventEvent();
                }
                // テキストエリアにコマンドのみの場合
                if (textarea === last_line)
                {
                    document.getElementById("editor_textarea").value = '';

                    // Enterキーを無効にして改行させない コマンドのみなので削除
                    onPreventEvent();
                }
            }
        }
    }

    const textarea_element = document.getElementById("editor_textarea");
    
    /* Enterが押された時の処理 */
    textarea_element.addEventListener('keydown', enter_handle, false);
    const preventEvent    = (e) => e.preventDefault();
    const onPreventEvent  = (e) => textarea_element.addEventListener('keypress', preventEvent, false );
    const offPreventEvent = (e) => textarea_element.removeEventListener('keypress', preventEvent, false );
    
    // textarea_element.addEventListener('keydown', splitByLine, false );
</script>
</body>
</html>