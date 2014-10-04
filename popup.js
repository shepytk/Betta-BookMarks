function insert_value(){
    var row = new Element("tr"),
        key = $('key').value,
        val = $('val').value;
    if(!key){
        alert("KEY NEEDS TO BE SET!");
        $('key').focus();
        return;
    }
    $.jStorage.set(key, val);
    $('key').value = "";
    $('val').value = "";
    reDraw();
}

function flush_data(){
    $.jStorage.flush();
    reDraw();
}

function get_value(){
    var value = $.jStorage.get($F("key2"));
    alert(value);
    $('key2').value = "";
}

function flush_values(){
    $.jStorage.flush();
    reDraw();
}

function reDraw(){

    var row, del, index;

    $$("tr[class~=rida]").each(function(c){c.remove();});

    index = $.jStorage.index();
    for(var i=0; i<index.length; i++){
        row = new Element("tr",{className:"rida"});
        row.insert(new Element("td").update(index[i]));
        row.insert(new Element("td").update($.jStorage.get(index[i])));
        del = new Element("a",{href:"javascript:void(0)"}).update("DEL");
        (function(i){
            del.observe("click", function(){
                $.jStorage.deleteKey(i);
                reDraw();
            });
        })(index[i])
        row.insert(new Element("td").insert(del));
        $("tulemused").insert(row);

    }
}

