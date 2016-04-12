/**
 * Created by iceli on 16/4/11.
 */

(function ($) {
    $(function(){
        // 乐透
        var LT = {
            arr: [],
            grp: [],
            tpl: {},
            elements: {},
            number: {
                min: 1,
                max: 33
            },
            init: function () {
                this.render();
                this.bindEvents();

                return this;
            },
            render: function () {
                var that = this;

                that.initElements();
            },
            initElements: function () {
                var that = this;
                var tpl = that.tpl;
                var ele = that.elements;

                tpl.arrTpl = $('#J_arrayTpl').html();
                tpl.grpTpl = $('#J_groupTpl').html();
                ele.$arrayList = $('.array-list');
                ele.$groupList = $('.group-list');
                ele.$addArrBtn = $('.J_addArrBtn');
                ele.$addGrpBtn = $('.J_addGrpBtn');
                ele.$getResultBtn = $('.J_getResultBtn');
                ele.$groupFiltertn = $('.J_groupFilter');
                ele.$resultTextarea = $('.J_resultTextarea');

            },
            bindEvents: function () {
                var that = this;

                that.onAddArr();
                that.onAddGrp();
                that.onArrListKeyUp();
                that.onGrpListKeyUp();
                that.onGrpFilterKeyUp();
                that.onGetResult();
            },
            onAddArr: function () {
                var that = this;
                var tpl = that.tpl;
                var ele = that.elements;
                var grp = that.grp;


                ele.$addGrpBtn.on('click', function() {
                    var index = grp.length;

                    ele.$groupList.append(tpl.grpTpl.replace('{{index}}', index + 1));
                    grp[index] = '';
                }).trigger('click');
            },
            onAddGrp: function () {
                var that = this;
                var tpl = that.tpl;
                var ele = that.elements;
                var arr = that.arr;


                ele.$addArrBtn.on('click', function() {
                    var index = arr.length;

                    ele.$arrayList.append(tpl.arrTpl.replace('{{index}}', index + 1));
                    arr[index] = '';
                }).trigger('click').trigger('click').trigger('click');
            },
            onArrListKeyUp: function () {
                var that = this;
                var ele = that.elements;

                ele.$arrayList.on('keyup.arr', 'input.arr', function(e) {
                    var me = $(this);
                    var val = $.trim(me.val());
                    var idx = me.parents('li').index();

                    me.parents('li').removeClass('has-error');

                    if(!val) {
                        return false;
                    }
                    var arr = val.split(',');

                    try {
                        that.checkNumber(arr, 1, 33);
                        that.arr[idx] = arr;
                    } catch (e) {
                        me.parents('li').addClass('has-error');
                    }
                });
            },
            onGrpListKeyUp: function () {
                var that = this;
                var ele = that.elements;

                ele.$groupList.on('keyup.grp', 'input.grp', function(e) {
                    var me = $(this);
                    var val = $.trim(me.val());
                    var idx = me.parent().index();

                    me.parent().removeClass('has-error');

                    if(!val) {
                        return false;
                    }
                    var arr = val.split(' ');

                    try {
                        that.checkNumber(arr, 1, 30);
                        that.grp[idx] = arr;
                    } catch (e) {
                        me.parent().addClass('has-error');
                    }
                });

            },
            onGrpFilterKeyUp: function () {
                var that = this;
                var ele = that.elements;

                ele.$groupFiltertn.on('keyup.filter', function(e) {
                    var me = $(this);
                    var val = $.trim(me.val());

                    me.parent().removeClass('has-error');

                    if(!val) {
                        return false;
                    }
                    var arr = val.split(' ');

                    try {
                        that.checkNumber(arr, 1, 30);
                    } catch (e) {
                        me.parent().addClass('has-error');
                    }
                });

            },
            onGetResult: function () {
                var that = this;
                var ele = that.elements;
                var arr = that.arr;
                var grp = that.grp;
                var numbers = new Array(33);

                $(numbers).each(function(i,v){
                    numbers[i] = i + 1;
                });

                ele.$getResultBtn.on('click', function() {
                    var result = '';
                    var filter = $.trim(ele.$groupFiltertn.val());

                    $(grp).each(function(i, v){
                        if(!filter || v.length == filter) {
                            var tmpArr = [];
                            var tmpNum = numbers.concat();

                            $(v).each(function(idx, val){
                                tmpArr = tmpArr.concat(arr[val - 1]);
                            });

                            $(tmpArr).each(function(idx, val){
                                $(tmpNum).each(function(index, value){
                                    if(val == value) {
                                        tmpNum.splice(index,1);
                                    }
                                });
                            });

                            result += '题' + (i + 1) + '的结果：' + tmpNum.join(',') + '\r\n';
                        }

                    });

                    ele.$resultTextarea.val(result);
                });
            },
            checkNumber: function(arr, min, max) {
                var regex = max == 30 ? /^([1-9]|[1-2]\d|30)$/ : /^([1-9]|[1-2]\d|3[0-3])$/;

                $(arr).each(function(index, value) {
                    if(!regex.test(value) && value !== '') {
                        throw {
                            name: 'TypeError',
                            message: '包含非法参数'
                        };
                    }
                });
            }
        };

        window.LT = LT.init();
    });

})(jQuery);