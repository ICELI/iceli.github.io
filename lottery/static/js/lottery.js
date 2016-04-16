/**
 * Created by iceli on 16/4/11.
 */

(function ($) {
    $(function () {
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
                var arr = that.arr;

                ele.$addArrBtn.on('click', function () {
                    var index = arr.length;

                    ele.$arrayList.append(tpl.arrTpl.replace('{{index}}', index + 1));
                    arr[index] = '';
                }).trigger('click').trigger('click').trigger('click');
            },
            onAddGrp: function () {
                var that = this;
                var ele = that.elements;
                var arr = that.arr;
                var count = 0;
                var obj = {};

                ele.$addGrpBtn.on('click', function () {
                    var grpVal = [];
                    var filter = +$.trim(ele.$groupFiltertn.val());
                    var numbers = new Array(arr.length);

                    $.each(numbers, function (i, v) {
                        numbers[i] = i + 1;
                    });

                    ele.$addGrpBtn.attr('disabled', true).html('<i class="glyphicon glyphicon-refresh"></i> 计算中…');
                    setTimeout(function() {
                        that.grp = [];
                        if(filter) {
                            if(filter == 1) {
                                $.each(numbers, function (i, v) {
                                    that.grp[i] = [v];
                                });
                                grpVal = numbers;
                            } else {
                                count = 0;
                                obj = {};
                                perm(numbers, filter);
                                $.each(that.grp, function (i, v) {
                                    grpVal.push(v.join(' '));
                                });
                            }
                        }

                        ele.$groupList.find('textarea.grp').val(grpVal.join('\r'));
                        ele.$addGrpBtn.attr('disabled', false).html('<i class="glyphicon glyphicon-plus"></i> 添加条件');

                        window.console && console.log(that.grp)
                    }, 300);
                });
                // 递归链接算法
                function perm(arr, m) {
                    (function fn(leftArr, lastArr) {
                        if(leftArr.length == m) {
                            var leftStr = leftArr.sort(function(a, b) {
                                return a - b;
                            }).join('-');

                            if(obj[leftStr]) {
                                return false;
                            }
                            that.grp[count] = leftArr;
                            obj[leftStr] = true;
                            count++;
                        } else {
                            for(var i = 0, l = lastArr.length; i < l; i++) {
                                fn(leftArr.concat(lastArr[i]), lastArr.slice(0, i).concat(lastArr.slice(i + 1)));
                            }
                        }
                    })((arr.length == m ? arr : []), arr);
                }
            },
            onArrListKeyUp: function () {
                var that = this;
                var ele = that.elements;

                ele.$arrayList.on('keyup.arr', 'input.arr', function (e) {
                    var me = $(this);
                    var val = $.trim(me.val());
                    var idx = me.parents('li').index();

                    me.parents('li').removeClass('has-error');

                    if (!val) {
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

                ele.$groupList.on('keyup.grp', 'textarea.grp', function (e) {
                    var me = $(this);
                    var val = $.trim(me.val());

                    that.grp = [];
                    me.parent().removeClass('has-error');

                    if (!val) {
                        return false;
                    }
                    var newVal = val.replace(/(\r(\n)?|\n)/g, '-');
                    var newArr = newVal.split('-');

                    $.each(newArr, function(index, value){
                        if (!value) {
                            return false;
                        }

                        var arr = value.split(' ');

                        try {
                            that.checkNumber(arr, 1, 30);
                            that.grp[index] = arr;
                        } catch (e) {
                            me.parent().addClass('has-error');
                        }
                    });
                });

            },
            onGrpFilterKeyUp: function () {
                var that = this;
                var ele = that.elements;

                ele.$groupFiltertn.on('keyup.filter', function (e) {
                    var me = $(this);
                    var val = $.trim(me.val());

                    me.parent().removeClass('has-error');

                    if (!val) {
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
                var numbers = new Array(33);

                $.each(numbers, function (i, v) {
                    numbers[i] = i + 1;
                });

                ele.$getResultBtn.on('click', function () {
                    var arr = that.arr;
                    var grp = that.grp;
                    var result = '';

                    ele.$getResultBtn.attr('disabled', true).html('<i class="glyphicon glyphicon-refresh"></i> 计算中…');
                    setTimeout(function(){

                        $.each(grp, function (i, v) {
                            var tmpArr = [];
                            var tmpNum = numbers.concat();

                            $.each(v, function (idx, val) {
                                tmpArr = tmpArr.concat(arr[val - 1]);
                            });

                            $.each(tmpArr, function (idx, val) {
                                $.each(tmpNum, function (index, value) {
                                    if (val == value) {
                                        tmpNum.splice(index, 1);
                                    }
                                });
                            });

                            result += '题' + (i + 1) + '的结果：' + tmpNum.join(',') + '\r\n';

                        });

                        ele.$resultTextarea.val(result);
                        ele.$getResultBtn.attr('disabled', false).html('<i class="glyphicon glyphicon-play"></i> 生成结果');

                    }, 300);
                });
            },
            checkNumber: function (arr, min, max) {
                var regex = max == 30 ? /^(0?[1-9]|[1-2]\d|30)$/ : /^(0?[1-9]|[1-2]\d|3[0-3])$/;

                $.each(arr, function (index, value) {
                    if (!regex.test(value) && value !== '') {
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