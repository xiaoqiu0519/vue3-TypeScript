生命周期: beforeCreate * create ——> setup;
		beforeMount ———>onBeforeMount;
		mounted—————>onMounted
		beforeUpdate———->onBeforeUpdate
		updated————>onUpdated
		beforeDestory ————>onBeforeUnmount
		destoryed————>onUnmounted

vue2 中：主要是通过Object.defineproperty 来实现数据劫持的，这个对象中有set 和 get 方法，当改变对象的属性的时候会出发
                 set方法，这时候就可以在里面操作试图更新，当然获取对象的属性的时候也会出发get 方式
vue3 中：主要是通过proxy 来实现数据响应式变化的，这个对象主要是接收一个普通对象，返回一个响应式代理对象，通过set 和 get deleteProperty
                来监控数据变化的，然后通过Reflect这个来进行反射，两者配合就可以实现数据响应式
原理两者区别：vue2中在处理给对象新增属性或者通过数组下标修改对象的时候，直接修视图是不能更新的，需要通过$set来配合完成，vue3 更加强大高效，比方说对于比较复杂的对象数据，vue 中需要通过循环不		停的去监听，vue中就不需要了，可以proxy就可以深层次的去监听对象的变化


setup 是组合Api中的函数，只在初始化的时候执行一次
setup一般都是返回一个对象，对象中的数据可以直接在模版中使用
setup 执行的时期是在beforeCreate之前执行，只执行一次，setup执行的时候，当前的组件并不存在，不能使用this对象，this === undefind
setup 返回的对象中的数据和data返回的对象的数据合并为当前对象中的数据，都可以在模版中使用
setup 中的方法和methods中的方法会合并一起，如果有同名，会以setup中为准,不要混合使用
setup 中有两个参数，props 和 context ,props是一个对象，包含父级组件向子级组件传递的数据，context包含三个对象，attrs、emit、solt；attrs 获取当前标签上面所有属性的对象 eg：(<child mess='哈哈'></	      		child> 获取mess等)相当于 this.$attr； emit 是用来分发事件，相当于this.$emit()


ref 是一个函数，定义一个响应式数据，返回一个响应式对象，对象中有value属性，如果要对其值改变，需要对他的value属性进行操作，使用的时候，模版中不需要带上 点 value
ref 一般是用来定义一个基本类型的响应式数据，类型是ref类型；如果传递一个对象，里面的对象会通过reactive进行处理，会处理成Proxy对象
shallowRef 浅监视

ref和toRef的区别
(1). ref本质是拷贝，修改响应式数据不会影响原始数据，界面会自动更新；toRef的本质是引用关系，修改响应式数据会影响原始数据，但是界面不会自动更新
(2). toRef传参与ref不同；toRef接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性

toRefs 可以reactive 包裹的对象转化成普通对象，该普通对象的每一个 property 都是ref 对象 ;const {name,age} = toRefs(user)

reactive 一般将一个普通对象返回为一个响应式代理对象，响应式对象是深层的，代理对象的类型是Proxy类型
reactive 中如果更新目标对象，代理对象是会发生变的，但是试图并不会更新。所以要更新实图，需要通过改变代理对象
shallowReactive 浅监视


Provide  inject
provide向所有子孙组件提供数据以及提供修改数据的方法，子孙组件用inject使用。inject()只能放在setup()生命周期里运行，不能放在别的周期里，也不能放在事件周期里运行（定时器，Promise里面都是不行的）

readonly & shallowReadonly 限制只读属性，如果通过此函数 声明的变量,const user = readonly({name:'xiao',age:'12'}) 不能通过user.name 进行改变；readonly深度限制，shallowReadonly浅度限制


toRaw 把代理对象转化成普通对象 数据变化，视图不变化
markRaw 通过markRaw 标记的对象数据，从此以后都不能成为代理对象


computed 如果只传入一个回调函数，只调用get方法
watch 计算的属性，不能自执行，如果需要自动执行需要添加参数 immediate：true，深度计算需要添加属性deep:true
watchEfflect 不需要添加参数就可以默认执行
wathc 如果监听的不是响应式数据，需要用回调的方式处理一下



