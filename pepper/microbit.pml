<?xml version="1.0" encoding="UTF-8" ?>
<Package name="microbit" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="behavior_1" xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs />
    <Resources>
        <File name="__init__" src="lib/websocket/__init__.py" />
        <File name="_abnf" src="lib/websocket/_abnf.py" />
        <File name="_app" src="lib/websocket/_app.py" />
        <File name="_core" src="lib/websocket/_core.py" />
        <File name="_exceptions" src="lib/websocket/_exceptions.py" />
        <File name="_utils" src="lib/websocket/_utils.py" />
        <File name="cacert" src="lib/websocket/cacert.pem" />
        <File name="six" src="lib/websocket/six.py" />
        <File name="__init__" src="lib/websocket/tests/__init__.py" />
        <File name="header01" src="lib/websocket/tests/data/header01.txt" />
        <File name="header02" src="lib/websocket/tests/data/header02.txt" />
        <File name="test_websocket" src="lib/websocket/tests/test_websocket.py" />
    </Resources>
    <Topics />
    <IgnoredPaths />
    <Translations auto-fill="en_US">
        <Translation name="translation_en_US" src="translations/translation_en_US.ts" language="en_US" />
        <Translation name="translation_ja_JP" src="translations/translation_ja_JP.ts" language="ja_JP" />
    </Translations>
</Package>
