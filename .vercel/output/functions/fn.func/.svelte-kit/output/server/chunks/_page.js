import { n as noop, k as set_current_component, r as run_all, l as current_component, g as getContext, c as create_ssr_component, a as subscribe, b as setContext, o as onDestroy, v as validate_component, p as get_current_component, q as compute_rest_props, d as get_store_value, f as add_attribute, t as is_promise, m as missing_component } from "./ssr.js";
import { w as writable, d as derived, r as readable } from "./index.js";
import * as THREE from "three";
import { REVISION, PerspectiveCamera, Clock, Scene as Scene$1, WebGLRenderer, PCFSoftShadowMap, ColorManagement, sRGBEncoding, LinearEncoding, ACESFilmicToneMapping, Vector3, Matrix4, Mesh, ShaderChunk, Vector2, Raycaster } from "three";
import * as theatreCore from "@theatre/core";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const useThrelteInternal = () => {
  return getContext("threlte-internal-context");
};
const contextName = "threlte-disposable-object-context";
const DisposableObject = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mergedDispose, $$unsubscribe_mergedDispose;
  let $parentDispose, $$unsubscribe_parentDispose;
  const { collectDisposableObjects, addDisposableObjects, removeDisposableObjects } = useThrelteInternal();
  let { object = void 0 } = $$props;
  let previousObject = object;
  let { dispose = void 0 } = $$props;
  const parentDispose = getContext(contextName);
  $$unsubscribe_parentDispose = subscribe(parentDispose, (value) => $parentDispose = value);
  const mergedDispose = writable(dispose ?? $parentDispose ?? true);
  $$unsubscribe_mergedDispose = subscribe(mergedDispose, (value) => $mergedDispose = value);
  setContext(contextName, mergedDispose);
  let disposables = $mergedDispose ? collectDisposableObjects(object) : [];
  addDisposableObjects(disposables);
  onDestroy(() => {
    removeDisposableObjects(disposables);
  });
  if ($$props.object === void 0 && $$bindings.object && object !== void 0)
    $$bindings.object(object);
  if ($$props.dispose === void 0 && $$bindings.dispose && dispose !== void 0)
    $$bindings.dispose(dispose);
  {
    mergedDispose.set(dispose ?? $parentDispose ?? true);
  }
  {
    {
      if (object !== previousObject) {
        removeDisposableObjects(disposables);
        disposables = $mergedDispose ? collectDisposableObjects(object) : [];
        addDisposableObjects(disposables);
        previousObject = object;
      }
    }
  }
  $$unsubscribe_mergedDispose();
  $$unsubscribe_parentDispose();
  return `${slots.default ? slots.default({}) : ``}`;
});
function createObjectStore(object, onChange2) {
  const objectStore = writable(object);
  let unwrappedObject = object;
  const unsubscribeObjectStore = objectStore.subscribe((o) => unwrappedObject = o);
  onDestroy(unsubscribeObjectStore);
  const set = (newObject) => {
    if (newObject?.uuid === unwrappedObject?.uuid)
      return;
    const oldObject = unwrappedObject;
    objectStore.set(newObject);
    onChange2?.(newObject, oldObject);
  };
  const update2 = (callback) => {
    const newObject = callback(unwrappedObject);
    if (newObject?.uuid === unwrappedObject?.uuid)
      return;
    const oldObject = unwrappedObject;
    objectStore.set(newObject);
    onChange2?.(newObject, oldObject);
  };
  return {
    ...objectStore,
    set,
    update: update2
  };
}
const useThrelte = () => {
  const context = getContext("threlte");
  if (context === void 0) {
    throw new Error("No Threlte context found, are you using this hook inside of <Canvas>?");
  }
  return context;
};
const useParent = () => {
  return getContext("threlte-hierarchical-parent-context");
};
const useHierarchicalObject = () => {
  return {
    onChildMount: getContext("threlte-hierarchical-object-on-mount"),
    onChildDestroy: getContext("threlte-hierarchical-object-on-destroy")
  };
};
const HierarchicalObject = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $parentStore, $$unsubscribe_parentStore;
  let { object = void 0 } = $$props;
  let { children = [] } = $$props;
  let { onChildMount = void 0 } = $$props;
  const onChildMountProxy = (child) => {
    children.push(child);
    children = children;
    onChildMount?.(child);
  };
  let { onChildDestroy = void 0 } = $$props;
  const onChildDestroyProxy = (child) => {
    const index = children.findIndex((c) => c.uuid === child.uuid);
    if (index !== -1)
      children.splice(index, 1);
    children = children;
    onChildDestroy?.(child);
  };
  const { invalidate } = useThrelte();
  const parentStore = useParent();
  $$unsubscribe_parentStore = subscribe(parentStore, (value) => $parentStore = value);
  let { parent = $parentStore } = $$props;
  const parentCallbacks = useHierarchicalObject();
  if (object) {
    parentCallbacks.onChildMount?.(object);
    invalidate("HierarchicalObject: object added");
  }
  const objectStore = createObjectStore(object, (newObject, oldObject) => {
    if (oldObject) {
      parentCallbacks.onChildDestroy?.(oldObject);
      invalidate("HierarchicalObject: object added");
    }
    if (newObject) {
      parentCallbacks.onChildMount?.(newObject);
      invalidate("HierarchicalObject: object removed");
    }
  });
  onDestroy(() => {
    if (object) {
      parentCallbacks.onChildDestroy?.(object);
      invalidate("HierarchicalObject: object removed");
    }
  });
  setContext("threlte-hierarchical-object-on-mount", onChildMountProxy);
  setContext("threlte-hierarchical-object-on-destroy", onChildDestroyProxy);
  setContext("threlte-hierarchical-parent-context", objectStore);
  if ($$props.object === void 0 && $$bindings.object && object !== void 0)
    $$bindings.object(object);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  if ($$props.onChildMount === void 0 && $$bindings.onChildMount && onChildMount !== void 0)
    $$bindings.onChildMount(onChildMount);
  if ($$props.onChildDestroy === void 0 && $$bindings.onChildDestroy && onChildDestroy !== void 0)
    $$bindings.onChildDestroy(onChildDestroy);
  if ($$props.parent === void 0 && $$bindings.parent && parent !== void 0)
    $$bindings.parent(parent);
  parent = $parentStore;
  {
    objectStore.set(object);
  }
  $$unsubscribe_parentStore();
  return `   ${slots.default ? slots.default({}) : ``}`;
});
const SceneGraphObject = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { object } = $$props;
  if ($$props.object === void 0 && $$bindings.object && object !== void 0)
    $$bindings.object(object);
  return `${validate_component(HierarchicalObject, "HierarchicalObject").$$render(
    $$result,
    {
      object,
      onChildMount: (child) => object.add(child),
      onChildDestroy: (child) => object.remove(child)
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const resolvePropertyPath = (target, propertyPath) => {
  if (propertyPath.includes(".")) {
    const path = propertyPath.split(".");
    const key = path.pop();
    for (let i = 0; i < path.length; i += 1) {
      target = target[path[i]];
    }
    return {
      target,
      key
    };
  } else {
    return {
      target,
      key: propertyPath
    };
  }
};
const initialValueBeforeAttach = Symbol("initialValueBeforeAttach");
const useAttach = () => {
  const { invalidate } = useThrelte();
  let isAttached = false;
  let valueBeforeAttach = initialValueBeforeAttach;
  let detachFn;
  let attachedTo;
  let attachedKey;
  const update2 = (instance, parent, attach) => {
    detach();
    if (!attach) {
      const i = instance;
      const isMaterial = i?.isMaterial || false;
      if (isMaterial) {
        attach = "material";
      }
      const isGeometry = i?.isBufferGeometry || i?.isGeometry || false;
      if (isGeometry) {
        attach = "geometry";
      }
    }
    if (!attach)
      return;
    if (typeof attach === "function") {
      detachFn = attach(parent, instance);
    } else {
      const { target, key } = resolvePropertyPath(parent, attach);
      valueBeforeAttach = target[key];
      target[key] = instance;
      attachedTo = target;
      attachedKey = key;
    }
    isAttached = true;
    invalidate();
  };
  const detach = () => {
    if (!isAttached)
      return;
    if (detachFn) {
      detachFn();
      detachFn = void 0;
    } else if (attachedTo && attachedKey && valueBeforeAttach !== initialValueBeforeAttach) {
      attachedTo[attachedKey] = valueBeforeAttach;
      valueBeforeAttach = initialValueBeforeAttach;
      attachedTo = void 0;
      attachedKey = void 0;
    }
    isAttached = false;
    invalidate();
  };
  onDestroy(() => {
    detach();
  });
  return {
    update: update2
  };
};
const isCamera = (value) => {
  return value && value.isCamera;
};
const isOrthographicCamera = (value) => {
  return value && value.isOrthographicCamera;
};
const isPerspectiveCamera = (value) => {
  return value && value.isPerspectiveCamera;
};
const isPerspectiveCameraOrOrthographicCamera = (value) => {
  return isPerspectiveCamera(value) || isOrthographicCamera(value);
};
const useCamera = () => {
  const { invalidate, size, camera } = useThrelte();
  let currentInstance;
  let unsubscribe = void 0;
  onDestroy(() => {
    unsubscribe?.();
  });
  const subscriber = (size2) => {
    if (!currentInstance)
      return;
    if (isOrthographicCamera(currentInstance)) {
      currentInstance.left = size2.width / -2;
      currentInstance.right = size2.width / 2;
      currentInstance.top = size2.height / 2;
      currentInstance.bottom = size2.height / -2;
      currentInstance.updateProjectionMatrix();
      currentInstance.updateMatrixWorld();
      invalidate();
    } else if (isPerspectiveCamera(currentInstance)) {
      currentInstance.aspect = size2.width / size2.height;
      currentInstance.updateProjectionMatrix();
      currentInstance.updateMatrixWorld();
      invalidate();
    }
  };
  const update2 = (instance, manual) => {
    unsubscribe?.();
    if (manual || !isPerspectiveCameraOrOrthographicCamera(instance)) {
      currentInstance = void 0;
      return;
    }
    currentInstance = instance;
    unsubscribe = size.subscribe(subscriber);
  };
  const makeDefaultCamera = (instance, makeDefault) => {
    if (!isCamera(instance) || !makeDefault)
      return;
    camera.set(instance);
    invalidate();
  };
  return {
    update: update2,
    makeDefaultCamera
  };
};
const createRawEventDispatcher = () => {
  const component = get_current_component();
  const dispatchRawEvent = (type, value) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      callbacks.forEach((fn) => {
        fn(value);
      });
    }
  };
  const hasEventListener = (type) => {
    return Boolean(component.$$.callbacks[type]);
  };
  Object.defineProperty(dispatchRawEvent, "hasEventListener", {
    value: hasEventListener,
    enumerable: true
  });
  return dispatchRawEvent;
};
const useCreateEvent = () => {
  createRawEventDispatcher();
  const cleanupFunctions = [];
  const updateRef = (newRef) => {
    return;
  };
  onDestroy(() => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  });
  return {
    updateRef
  };
};
const isEventDispatcher = (value) => {
  return !!value?.addEventListener;
};
const useEvents = () => {
  const dispatch = createRawEventDispatcher();
  get_current_component();
  const eventHandlerProxy = (event) => {
    if (event?.type) {
      dispatch(event.type, event);
    }
  };
  const cleanupEventListeners = (ref2, events) => {
    if (isEventDispatcher(ref2)) {
      events.forEach((eventName) => {
        ref2.removeEventListener(eventName, eventHandlerProxy);
      });
    }
  };
  const addEventListeners = (ref2, events) => {
    if (isEventDispatcher(ref2)) {
      events.forEach((eventName) => {
        ref2.addEventListener(eventName, eventHandlerProxy);
      });
    }
  };
  let currentEventNames = [];
  let currentRef;
  const eventNames = writable([]);
  const unsubscribeEventNames = eventNames.subscribe((eventNames2) => {
    cleanupEventListeners(currentRef, currentEventNames);
    addEventListeners(currentRef, eventNames2);
    currentEventNames = eventNames2;
  });
  onDestroy(unsubscribeEventNames);
  const ref = writable();
  const unsubscribeRef = ref.subscribe((value) => {
    cleanupEventListeners(currentRef, currentEventNames);
    addEventListeners(value, currentEventNames);
    currentRef = value;
  });
  onDestroy(unsubscribeRef);
  onDestroy(() => {
    cleanupEventListeners(currentRef, currentEventNames);
  });
  const updateRef = (newRef) => {
    ref.set(newRef);
  };
  return {
    updateRef
  };
};
const usePlugins = (params) => {
  const pluginContextName = "threlte-plugin-context";
  const plugins = getContext(pluginContextName);
  if (!plugins)
    return;
  const pluginsReturns = Object.values(plugins).map((plugin) => plugin(params)).filter(Boolean);
  const pluginsProps = pluginsReturns.flatMap((callback) => callback.pluginProps ?? []);
  let refCleanupCallbacks = [];
  onDestroy(() => {
    refCleanupCallbacks.forEach((callback) => callback());
  });
  const updateRef = (ref) => {
    refCleanupCallbacks.forEach((callback) => callback());
    refCleanupCallbacks = [];
    pluginsReturns.forEach((callback) => {
      const cleanupCallback = callback.onRefChange?.(ref);
      if (cleanupCallback) {
        refCleanupCallbacks.push(cleanupCallback);
      }
    });
  };
  const updateProps = (props) => {
    pluginsReturns.forEach((callback) => {
      callback.onPropsChange?.(props);
    });
  };
  const updateRestProps = (restProps) => {
    pluginsReturns.forEach((callback) => {
      callback.onRestPropsChange?.(restProps);
    });
  };
  return {
    updateRef,
    updateProps,
    updateRestProps,
    pluginsProps
  };
};
const ignoredProps = /* @__PURE__ */ new Set(["$$scope", "$$slots", "type", "args", "attach", "instance"]);
const updateProjectionMatrixKeys = /* @__PURE__ */ new Set([
  "fov",
  "aspect",
  "near",
  "far",
  "left",
  "right",
  "top",
  "bottom",
  "zoom"
]);
const memoizeProp = (value) => {
  if (typeof value === "string")
    return true;
  if (typeof value === "number")
    return true;
  if (typeof value === "boolean")
    return true;
  if (typeof value === "undefined")
    return true;
  if (value === null)
    return true;
  return false;
};
const useProps = () => {
  const { invalidate } = useThrelte();
  const memoizedProps = /* @__PURE__ */ new Map();
  const setProp = (instance, propertyPath, value, options) => {
    if (memoizeProp(value)) {
      const memoizedProp = memoizedProps.get(propertyPath);
      if (memoizedProp && memoizedProp.instance === instance && memoizedProp.value === value) {
        return;
      }
      memoizedProps.set(propertyPath, {
        instance,
        value
      });
    }
    const { key, target } = resolvePropertyPath(instance, propertyPath);
    if (!Array.isArray(value) && typeof value === "number" && typeof target[key]?.setScalar === "function") {
      target[key].setScalar(value);
    } else {
      if (typeof target[key]?.set === "function") {
        if (Array.isArray(value)) {
          target[key].set(...value);
        } else {
          target[key].set(value);
        }
      } else {
        target[key] = value;
        if (options.manualCamera)
          return;
        if (updateProjectionMatrixKeys.has(key) && (target.isPerspectiveCamera || target.isOrthographicCamera)) {
          target.updateProjectionMatrix();
        }
      }
    }
  };
  const updateProps = (instance, props, options) => {
    for (const key in props) {
      if (!ignoredProps.has(key) && !options.pluginsProps?.includes(key)) {
        setProp(instance, key, props[key], options);
      }
      invalidate();
    }
  };
  return {
    updateProps
  };
};
const T$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["is", "args", "attach", "manual", "makeDefault", "dispose", "ref"]);
  let $parent, $$unsubscribe_parent;
  let { is } = $$props;
  let { args = void 0 } = $$props;
  let { attach = void 0 } = $$props;
  let { manual = void 0 } = $$props;
  let { makeDefault = void 0 } = $$props;
  let { dispose = void 0 } = $$props;
  const parent = getContext("threlte-hierarchical-parent-context");
  $$unsubscribe_parent = subscribe(parent, (value) => $parent = value);
  const isClass = (type) => {
    return typeof type === "function" && /^\s*class\s+/.test(type.toString());
  };
  const argsIsConstructorParameters = (args2) => {
    return Array.isArray(args2);
  };
  const createEvent = useCreateEvent();
  let ref = isClass(is) && argsIsConstructorParameters(args) ? new is(...args) : isClass(
    is
  ) ? new is() : is;
  createEvent.updateRef(ref);
  let initialized = false;
  const maybeSetRef = () => {
    if (!initialized) {
      initialized = true;
      return;
    }
    ref = isClass(is) && argsIsConstructorParameters(args) ? new is(...args) : isClass(
      is
    ) ? new is() : is;
    createEvent.updateRef(ref);
  };
  let { ref: publicRef = ref } = $$props;
  const refStore = writable(ref);
  setContext("threlte-hierarchical-parent-context", refStore);
  const plugins = usePlugins({ ref, props: $$props });
  const pluginsProps = plugins?.pluginsProps ?? [];
  const props = useProps();
  const camera = useCamera();
  const attachment = useAttach();
  const events = useEvents();
  const extendsObject3D = (object) => {
    return !!object.isObject3D;
  };
  const isDisposableObject = (object) => {
    return object.dispose !== void 0;
  };
  if ($$props.is === void 0 && $$bindings.is && is !== void 0)
    $$bindings.is(is);
  if ($$props.args === void 0 && $$bindings.args && args !== void 0)
    $$bindings.args(args);
  if ($$props.attach === void 0 && $$bindings.attach && attach !== void 0)
    $$bindings.attach(attach);
  if ($$props.manual === void 0 && $$bindings.manual && manual !== void 0)
    $$bindings.manual(manual);
  if ($$props.makeDefault === void 0 && $$bindings.makeDefault && makeDefault !== void 0)
    $$bindings.makeDefault(makeDefault);
  if ($$props.dispose === void 0 && $$bindings.dispose && dispose !== void 0)
    $$bindings.dispose(dispose);
  if ($$props.ref === void 0 && $$bindings.ref && publicRef !== void 0)
    $$bindings.ref(publicRef);
  {
    maybeSetRef();
  }
  publicRef = ref;
  {
    refStore.set(ref);
  }
  {
    props.updateProps(ref, $$restProps, { manualCamera: manual, pluginsProps });
  }
  {
    camera.update(ref, manual);
  }
  {
    camera.makeDefaultCamera(ref, makeDefault);
  }
  {
    attachment.update(ref, $parent, attach);
  }
  {
    events.updateRef(ref);
  }
  {
    plugins?.updateRef(ref);
  }
  {
    plugins?.updateProps($$props);
  }
  {
    plugins?.updateRestProps($$restProps);
  }
  $$unsubscribe_parent();
  return `${isDisposableObject(ref) ? `${validate_component(DisposableObject, "DisposableObject").$$render($$result, { object: ref, dispose }, {}, {})}` : ``} ${extendsObject3D(ref) ? `${validate_component(SceneGraphObject, "SceneGraphObject").$$render($$result, { object: ref }, {}, {
    default: () => {
      return `${slots.default ? slots.default({ ref }) : ``}`;
    }
  })}` : `${slots.default ? slots.default({ ref }) : ``}`}`;
});
const browser = typeof window !== "undefined";
const useParentSize = () => {
  const parentSize = writable({ width: 0, height: 0 });
  if (!browser) {
    return {
      parentSize,
      parentSizeAction: () => {
      }
    };
  }
  const mutationOptions = { childList: true, subtree: false, attributes: false };
  let el;
  const observeParent = (parent) => {
    resizeObserver.disconnect();
    mutationObserver.disconnect();
    resizeObserver.observe(parent);
    mutationObserver.observe(parent, mutationOptions);
  };
  const resizeObserver = new ResizeObserver(([entry]) => {
    const { contentRect } = entry;
    parentSize.set({
      width: contentRect.width,
      height: contentRect.height
    });
  });
  const mutationObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const node of mutation.removedNodes) {
        if (el === node && el.parentElement) {
          observeParent(el.parentElement);
          return;
        }
      }
    }
  });
  const parentSizeAction = (node) => {
    el = node;
    if (!el.parentElement)
      return;
    observeParent(el.parentElement);
  };
  onDestroy(() => {
    resizeObserver.disconnect();
    mutationObserver.disconnect();
  });
  return {
    parentSize,
    parentSizeAction
  };
};
const revision = Number.parseInt(REVISION.replace("dev", ""));
const createCache = () => {
  setContext("threlte-cache", []);
};
const getThrelteUserData = (object) => {
  return object.userData;
};
const watch = (stores, callback) => {
  const d = derived(stores, (values) => {
    return values;
  });
  let cleanupFn;
  const unsubscribe = d.subscribe(async (values) => {
    if (cleanupFn)
      cleanupFn();
    const fn = await callback(values);
    if (fn)
      cleanupFn = fn;
  });
  onDestroy(() => {
    unsubscribe();
    if (cleanupFn)
      cleanupFn();
  });
};
function memoize(stores, transform) {
  const obj = {
    current: void 0
  };
  watch(stores, (v) => {
    obj.current = transform ? transform(v) : v;
  });
  return obj;
}
const currentWritable = (value) => {
  const store = writable(value);
  const extendedWritable = {
    set: (value2) => {
      extendedWritable.current = value2;
      store.set(value2);
    },
    subscribe: store.subscribe,
    update: (fn) => {
      const newValue = fn(extendedWritable.current);
      extendedWritable.current = newValue;
      store.set(newValue);
    },
    current: value
  };
  return extendedWritable;
};
const createDefaultCamera = () => {
  const defaultCamera = new PerspectiveCamera(75, 0, 0.1, 1e3);
  getThrelteUserData(defaultCamera).threlteDefaultCamera = true;
  defaultCamera.position.z = 5;
  defaultCamera.lookAt(0, 0, 0);
  return defaultCamera;
};
const setDefaultCameraAspectOnSizeChange = (ctx) => {
  watch(ctx.size, (size) => {
    if (getThrelteUserData(get_store_value(ctx.camera)).threlteDefaultCamera) {
      ctx.camera.update((c) => {
        const cam = c;
        cam.aspect = size.width / size.height;
        cam.updateProjectionMatrix();
        ctx.invalidate("Default camera: aspect ratio changed");
        return cam;
      });
    }
  });
};
const createContexts = (options) => {
  const internalCtx = {
    debugFrameloop: options.debugFrameloop,
    frame: 0,
    frameInvalidated: true,
    invalidations: {},
    manualFrameHandlers: /* @__PURE__ */ new Set(),
    autoFrameHandlers: /* @__PURE__ */ new Set(),
    allFrameHandlers: /* @__PURE__ */ new Set(),
    allFrameHandlersNeedSortCheck: false,
    renderHandlers: /* @__PURE__ */ new Set(),
    renderHandlersNeedSortCheck: false,
    advance: false,
    dispose: async (force = false) => {
      await tick();
      if (!internalCtx.shouldDispose && !force)
        return;
      internalCtx.disposableObjects.forEach((mounted, object) => {
        if (mounted === 0 || force) {
          object?.dispose?.();
          internalCtx.disposableObjects.delete(object);
        }
      });
      internalCtx.shouldDispose = false;
    },
    collectDisposableObjects: (object, objects) => {
      const disposables = objects ?? [];
      if (!object)
        return disposables;
      if (object?.dispose && typeof object.dispose === "function" && object.type !== "Scene") {
        disposables.push(object);
      }
      Object.entries(object).forEach(([propKey, propValue]) => {
        if (propKey === "parent" || propKey === "children" || typeof propValue !== "object")
          return;
        const value = propValue;
        if (value?.dispose) {
          internalCtx.collectDisposableObjects(value, disposables);
        }
      });
      return disposables;
    },
    addDisposableObjects: (objects) => {
      objects.forEach((obj) => {
        const currentValue = internalCtx.disposableObjects.get(obj);
        if (currentValue) {
          internalCtx.disposableObjects.set(obj, currentValue + 1);
        } else {
          internalCtx.disposableObjects.set(obj, 1);
        }
      });
    },
    removeDisposableObjects: (objects) => {
      if (objects.length === 0)
        return;
      objects.forEach((obj) => {
        const currentValue = internalCtx.disposableObjects.get(obj);
        if (currentValue && currentValue > 0) {
          internalCtx.disposableObjects.set(obj, currentValue - 1);
        }
      });
      internalCtx.shouldDispose = true;
    },
    disposableObjects: /* @__PURE__ */ new Map(),
    shouldDispose: false
  };
  const ctx = {
    size: derived([options.userSize, options.parentSize], ([uSize, pSize]) => {
      return uSize ? uSize : pSize;
    }),
    clock: new Clock(),
    camera: currentWritable(createDefaultCamera()),
    scene: new Scene$1(),
    renderer: void 0,
    invalidate: (debugFrameloopMessage) => {
      internalCtx.frameInvalidated = true;
      if (internalCtx.debugFrameloop && debugFrameloopMessage) {
        internalCtx.invalidations[debugFrameloopMessage] = internalCtx.invalidations[debugFrameloopMessage] ? internalCtx.invalidations[debugFrameloopMessage] + 1 : 1;
      }
    },
    advance: () => {
      internalCtx.advance = true;
    },
    colorSpace: currentWritable(options.colorSpace),
    toneMapping: currentWritable(options.toneMapping),
    dpr: currentWritable(options.dpr),
    useLegacyLights: currentWritable(options.useLegacyLights),
    shadows: currentWritable(options.shadows),
    colorManagementEnabled: currentWritable(options.colorManagementEnabled),
    frameloop: currentWritable(options.frameloop)
  };
  const userCtx = currentWritable({});
  setContext("threlte", ctx);
  setContext("threlte-internal-context", internalCtx);
  setContext("threlte-user-context", userCtx);
  const getCtx = () => ctx;
  const getInternalCtx = () => internalCtx;
  return {
    ctx,
    internalCtx,
    getCtx,
    getInternalCtx
  };
};
const colorSpaceToEncoding = {
  srgb: sRGBEncoding,
  "srgb-linear": LinearEncoding,
  "": LinearEncoding
};
const rendererHasOutputColorSpaceProperty = (renderer) => {
  return renderer.outputColorSpace !== void 0;
};
const useRenderer = (ctx) => {
  const renderer = writable(void 0);
  const createRenderer = (canvas, rendererParameters) => {
    ctx.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      canvas,
      antialias: true,
      alpha: true,
      ...rendererParameters
    });
    renderer.set(ctx.renderer);
  };
  watch([
    renderer,
    ctx.size,
    ctx.toneMapping,
    ctx.colorSpace,
    ctx.dpr,
    ctx.shadows,
    ctx.colorManagementEnabled,
    ctx.useLegacyLights
  ], ([renderer2, size, toneMapping, colorSpace, dpr, shadows, colorManagementEnabled, useLegacyLights]) => {
    if (!renderer2)
      return;
    renderer2.setSize(size.width, size.height);
    renderer2.setPixelRatio(dpr);
    if (rendererHasOutputColorSpaceProperty(renderer2)) {
      renderer2.outputColorSpace = colorSpace;
    } else {
      const encoding = colorSpaceToEncoding[colorSpace];
      if (!encoding) {
        console.warn("No encoding found for colorSpace", colorSpace);
      } else {
        renderer2.outputEncoding = encoding;
      }
    }
    renderer2.toneMapping = toneMapping;
    renderer2.shadowMap.enabled = !!shadows;
    if (shadows && shadows !== true) {
      renderer2.shadowMap.type = shadows;
    } else if (shadows === true) {
      renderer2.shadowMap.type = PCFSoftShadowMap;
    }
    const cm = ColorManagement;
    if (revision >= 150) {
      cm.enabled = colorManagementEnabled;
    } else {
      cm.legacyMode = !colorManagementEnabled;
    }
    const anyRenderer = renderer2;
    if (revision >= 150 && useLegacyLights) {
      anyRenderer.useLegacyLights = useLegacyLights;
    } else if (revision < 150) {
      anyRenderer.physicallyCorrectLights = !useLegacyLights;
    }
  });
  return {
    createRenderer
  };
};
const Canvas_svelte_svelte_type_style_lang = "";
const css = {
  code: "canvas.svelte-o3oskp{display:block}",
  map: null
};
const invalidationHandlers = /* @__PURE__ */ new Set();
const Canvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { dpr = browser ? window.devicePixelRatio : 1 } = $$props;
  let { toneMapping = ACESFilmicToneMapping } = $$props;
  let { colorSpace = "srgb" } = $$props;
  let { frameloop = "demand" } = $$props;
  let { debugFrameloop = false } = $$props;
  let { shadows = PCFSoftShadowMap } = $$props;
  let { size = void 0 } = $$props;
  let { rendererParameters = void 0 } = $$props;
  let { colorManagementEnabled = true } = $$props;
  let { useLegacyLights = revision >= 155 ? false : true } = $$props;
  let canvas;
  const userSize = writable(size);
  const { parentSize, parentSizeAction } = useParentSize();
  const contexts = createContexts({
    colorSpace,
    toneMapping,
    dpr,
    userSize,
    parentSize,
    debugFrameloop,
    frameloop,
    shadows,
    colorManagementEnabled,
    useLegacyLights
  });
  createCache();
  const ctx = contexts.ctx;
  setDefaultCameraAspectOnSizeChange(ctx);
  invalidationHandlers.add(ctx.invalidate);
  onDestroy(() => {
    invalidationHandlers.delete(ctx.invalidate);
  });
  useRenderer(ctx);
  onDestroy(() => {
    contexts.internalCtx.dispose(true);
    contexts.ctx.renderer?.dispose();
  });
  if ($$props.dpr === void 0 && $$bindings.dpr && dpr !== void 0)
    $$bindings.dpr(dpr);
  if ($$props.toneMapping === void 0 && $$bindings.toneMapping && toneMapping !== void 0)
    $$bindings.toneMapping(toneMapping);
  if ($$props.colorSpace === void 0 && $$bindings.colorSpace && colorSpace !== void 0)
    $$bindings.colorSpace(colorSpace);
  if ($$props.frameloop === void 0 && $$bindings.frameloop && frameloop !== void 0)
    $$bindings.frameloop(frameloop);
  if ($$props.debugFrameloop === void 0 && $$bindings.debugFrameloop && debugFrameloop !== void 0)
    $$bindings.debugFrameloop(debugFrameloop);
  if ($$props.shadows === void 0 && $$bindings.shadows && shadows !== void 0)
    $$bindings.shadows(shadows);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.rendererParameters === void 0 && $$bindings.rendererParameters && rendererParameters !== void 0)
    $$bindings.rendererParameters(rendererParameters);
  if ($$props.colorManagementEnabled === void 0 && $$bindings.colorManagementEnabled && colorManagementEnabled !== void 0)
    $$bindings.colorManagementEnabled(colorManagementEnabled);
  if ($$props.useLegacyLights === void 0 && $$bindings.useLegacyLights && useLegacyLights !== void 0)
    $$bindings.useLegacyLights(useLegacyLights);
  if ($$props.ctx === void 0 && $$bindings.ctx && ctx !== void 0)
    $$bindings.ctx(ctx);
  $$result.css.add(css);
  {
    userSize.set(size);
  }
  return `<canvas class="svelte-o3oskp"${add_attribute("this", canvas, 0)}>${``} </canvas>`;
});
const catalogue = {};
const augmentConstructorArgs = (args, is) => {
  const module = catalogue[is] || THREE[is];
  if (!module) {
    throw new Error(`No Three.js module found for ${is}. Did you forget to extend the catalogue?`);
  }
  return {
    ...args,
    props: {
      ...args.props,
      is: module
    }
  };
};
const proxyTConstructor = (is) => {
  return new Proxy(class {
  }, {
    construct(_, [args]) {
      const castedArgs = args;
      return new T$1(augmentConstructorArgs(castedArgs, is));
    }
  });
};
const T = new Proxy(class {
}, {
  construct(_, [args]) {
    const castedArgs = args;
    return new T$1(castedArgs);
  },
  get(_, is) {
    return proxyTConstructor(is);
  }
});
function injectPlugin(nameOrNamedPlugin, maybePlugin) {
  const contextName2 = "threlte-plugin-context";
  if (Array.isArray(nameOrNamedPlugin)) {
    const [name, plugin] = nameOrNamedPlugin;
    setContext(contextName2, {
      ...getContext(contextName2),
      [name]: plugin
    });
  } else {
    const name = nameOrNamedPlugin;
    const plugin = maybePlugin;
    if (!plugin)
      return;
    setContext(contextName2, {
      ...getContext(contextName2),
      [name]: plugin
    });
  }
}
const useFrame = (fn, options) => {
  if (!browser) {
    return {
      start: () => void 0,
      stop: () => void 0,
      started: readable(false)
    };
  }
  const renderCtx = getContext("threlte-internal-context");
  if (renderCtx === void 0) {
    throw new Error("No Threlte context found, are you using this hook inside of <Canvas>?");
  }
  const invalidate = options?.invalidate ?? true;
  const handler = {
    fn,
    order: options?.order,
    debugFrameloopMessage: options?.debugFrameloopMessage,
    invalidate
  };
  const started = writable(false);
  const stop = () => {
    if (invalidate) {
      renderCtx.autoFrameHandlers.delete(handler);
    } else {
      renderCtx.manualFrameHandlers.delete(handler);
    }
    renderCtx.allFrameHandlers.delete(handler);
    started.set(false);
  };
  const start = () => {
    if (invalidate) {
      renderCtx.autoFrameHandlers.add(handler);
    } else {
      renderCtx.manualFrameHandlers.add(handler);
    }
    renderCtx.allFrameHandlers.add(handler);
    renderCtx.allFrameHandlersNeedSortCheck = true;
    started.set(true);
  };
  if (options?.autostart ?? true) {
    start();
  }
  onDestroy(() => {
    stop();
  });
  return {
    start,
    stop,
    started: {
      subscribe: started.subscribe
    }
  };
};
const Studio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { enabled = true } = $$props;
  let { hide = false } = $$props;
  const browser2 = typeof window !== "undefined";
  if ($$props.enabled === void 0 && $$bindings.enabled && enabled !== void 0)
    $$bindings.enabled(enabled);
  if ($$props.hide === void 0 && $$bindings.hide && hide !== void 0)
    $$bindings.hide(hide);
  return `${browser2 && enabled ? `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(Component) {
      return ` ${validate_component(Component.default || missing_component, "svelte:component").$$render($$result, { hide }, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })} `;
    }(__value);
  }(import("./InnerStudio.js"))}` : `${slots.default ? slots.default({}) : ``}`}`;
});
const globalProjects = /* @__PURE__ */ new Map();
const globalSheets = /* @__PURE__ */ new Map();
const studio = currentWritable(void 0);
const { getProject, types, onChange, val } = theatreCore;
const Project = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name = "default" } = $$props;
  let { config = void 0 } = $$props;
  const project = globalProjects.get(name) ?? getProject(name, config);
  globalProjects.set(name, project);
  let { isReady = false } = $$props;
  const syncReady = async () => {
    await project.ready;
    isReady = true;
  };
  syncReady();
  setContext(`theatre-project`, project);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  if ($$props.isReady === void 0 && $$bindings.isReady && isReady !== void 0)
    $$bindings.isReady(isReady);
  return `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function() {
      return ` ${slots.default ? slots.default({ project }) : ``} `;
    }();
  }(project.ready)}`;
});
class SequenceController {
  key;
  position;
  playing;
  length;
  options;
  sequence;
  constructor(sequence, options = {}) {
    this.key = options?.key ?? "default";
    this.sequence = sequence;
    this.options = options;
    this.position = new SequencePosition(sequence, () => this.play());
    this.playing = new SequencePlaying(sequence, () => this.play());
    this.length = new SequenceLength(sequence);
    this.config = this.config.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
  }
  config(options) {
    const updatedOptions = { ...this.options, ...options };
    const noChange = Object.keys(updatedOptions).every((key) => this.options[key] == updatedOptions[key]);
    if (noChange) {
      return;
    } else {
      this.options = updatedOptions;
    }
    if (options.audio)
      this.sequence.attachAudio(options.audio);
    const replay = options.rate || options.range || options.iterationCount || options.direction || options.rafDriver;
    const playing = get_store_value(this.playing);
    if (playing && replay) {
      this.pause();
      this.play();
    }
  }
  play(opts = {}) {
    return this.sequence.play({ ...this.options, ...opts });
  }
  pause() {
    return this.sequence.pause();
  }
  reset() {
    this.position.set(0);
  }
}
class SequencePosition {
  sequence;
  play;
  subscribers;
  unsubscribe;
  constructor(sequence, play) {
    this.sequence = sequence;
    this.play = play;
    this.subscribers = /* @__PURE__ */ new Set();
    this.unsubscribe = onChange(this.sequence.pointer.position, (position) => {
      this.subscribers.forEach((subscription) => subscription(position));
    });
  }
  subscribe(subscription) {
    this.subscribers.add(subscription);
    subscription(this.sequence.position);
    return () => {
      this.subscribers.delete(subscription);
    };
  }
  update(callback) {
    this.set(callback(this.sequence.position));
  }
  set(value) {
    const isPlaying = val(this.sequence.pointer.playing);
    this.sequence.position = value;
    if (isPlaying)
      this.play();
  }
}
class SequencePlaying {
  sequence;
  play;
  subscribers;
  constructor(sequence, play) {
    this.sequence = sequence;
    this.play = play;
    this.subscribers = /* @__PURE__ */ new Set();
    onChange(this.sequence.pointer.playing, (playing) => {
      this.subscribers.forEach((subscription) => subscription(playing));
    });
  }
  subscribe(subscription) {
    this.subscribers.add(subscription);
    subscription(val(this.sequence.pointer.playing));
    return () => {
      this.subscribers.delete(subscription);
    };
  }
  update(callback) {
    const isPlaying = val(this.sequence.pointer.playing);
    const shouldBePlaying = callback(isPlaying);
    if (isPlaying && !shouldBePlaying)
      this.sequence.pause();
    if (!isPlaying && shouldBePlaying)
      this.play();
  }
  set(value) {
    const isPlaying = val(this.sequence.pointer.playing);
    const shouldBePlaying = value;
    if (isPlaying && !shouldBePlaying)
      this.sequence.pause();
    if (!isPlaying && shouldBePlaying)
      this.play();
  }
}
class SequenceLength {
  sequence;
  subscribers;
  unsubscribe;
  constructor(sequence) {
    this.sequence = sequence;
    this.subscribers = /* @__PURE__ */ new Set();
    this.unsubscribe = onChange(this.sequence.pointer.length, (length) => {
      this.subscribers.forEach((run) => run(length));
    });
  }
  subscribe(subscription) {
    this.subscribers.add(subscription);
    subscription(val(this.sequence.pointer.length));
    return () => {
      this.subscribers.delete(subscription);
    };
  }
}
const Sheet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const project = getContext("theatre-project");
  const projectName = project.address.projectId;
  let { name = "default" } = $$props;
  let { instance = void 0 } = $$props;
  const sheet = globalSheets.get(`${projectName}-${name}-${instance}`) ?? project.sheet(name, instance);
  globalSheets.set(`${projectName}-${name}-${instance}`, sheet);
  const sequence = new SequenceController(sheet.sequence);
  const sequences = { default: sequence };
  setContext("theatre-sheet", { sheet, sequences });
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.instance === void 0 && $$bindings.instance && instance !== void 0)
    $$bindings.instance(instance);
  if ($$props.sheet === void 0 && $$bindings.sheet && sheet !== void 0)
    $$bindings.sheet(sheet);
  if ($$props.sequence === void 0 && $$bindings.sequence && sequence !== void 0)
    $$bindings.sequence(sequence);
  return `${slots.default ? slots.default({ sheet }) : ``}`;
});
const Theatre = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { studio: studio2 = {} } = $$props;
  let { config = void 0 } = $$props;
  if ($$props.studio === void 0 && $$bindings.studio && studio2 !== void 0)
    $$bindings.studio(studio2);
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  return `${validate_component(Studio, "Studio").$$render($$result, Object.assign({}, studio2), {}, {
    default: () => {
      return `${validate_component(Project, "Project").$$render($$result, { config }, {}, {
        default: () => {
          return `${validate_component(Sheet, "Sheet").$$render($$result, {}, {}, {
            default: () => {
              return `${slots.default ? slots.default({}) : ``}`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
new Vector3();
new Vector3();
new Vector3();
Number.parseInt(REVISION.replace("dev", ""));
new Matrix4();
new Matrix4();
new Mesh();
`
    ${ShaderChunk.logdepthbuf_pars_vertex}
    ${ShaderChunk.fog_pars_vertex}

    attribute vec3 previous;
    attribute vec3 next;
    attribute float side;
    attribute float width;
    attribute float counters;

    uniform vec2 resolution;
    uniform float lineWidth;
    uniform vec3 color;
    uniform float opacity;
    uniform float sizeAttenuation;
    uniform float scaleDown;

    varying vec2 vUV;
    varying vec4 vColor;
    varying float vCounters;

    vec2 intoScreen(vec4 i) {
        return resolution * (0.5 * i.xy / i.w + 0.5);
    }

    void main() {
        float aspect = resolution.y / resolution.x;

        mat4 m = projectionMatrix * modelViewMatrix;

        vec4 currentClip = m * vec4( position, 1.0 );
        vec4 prevClip = m * vec4( previous, 1.0 );
        vec4 nextClip = m * vec4( next, 1.0 );

        vec4 currentNormed = currentClip / currentClip.w;
        vec4 prevNormed = prevClip / prevClip.w;
        vec4 nextNormed = nextClip / nextClip.w;

        vec2 currentScreen = intoScreen(currentNormed);
        vec2 prevScreen = intoScreen(prevNormed);
        vec2 nextScreen = intoScreen(nextNormed);

        float actualWidth = lineWidth * width;

        vec2 dir;
        if(nextScreen == currentScreen) {
            dir = normalize( currentScreen - prevScreen );
        } else if(prevScreen == currentScreen) {
            dir = normalize( nextScreen - currentScreen );
        } else {
            vec2 inDir = currentScreen - prevScreen;
            vec2 outDir = nextScreen - currentScreen;
            vec2 fullDir = nextScreen - prevScreen;

            if(length(fullDir) > 0.0) {
                dir = normalize(fullDir);
            } else if(length(inDir) > 0.0){
                dir = normalize(inDir);
            } else {
                dir = normalize(outDir);
            }
        }

        vec2 normal = vec2(-dir.y, dir.x);

        if(sizeAttenuation != 0.0) {
            normal /= currentClip.w;
            normal *= min(resolution.x, resolution.y);
        }

        if (scaleDown > 0.0) {
            float dist = length(nextNormed - prevNormed);
            normal *= smoothstep(0.0, scaleDown, dist);
        }

        vec2 offsetInScreen = actualWidth * normal * side * 0.5;

        vec2 withOffsetScreen = currentScreen + offsetInScreen;
        vec3 withOffsetNormed = vec3((2.0 * withOffsetScreen/resolution - 1.0), currentNormed.z);

        vCounters = counters;
        vColor = vec4( color, opacity );
        vUV = uv;

        gl_Position = currentClip.w * vec4(withOffsetNormed, 1.0);

        ${ShaderChunk.logdepthbuf_vertex}
        ${ShaderChunk.fog_vertex}
    }
`;
const getDefaultComputeFunction = (state) => {
  const camera = memoize(useThrelte().camera);
  let width = 0;
  let height = 0;
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
    }
  });
  watch(state.target, (target) => {
    if (target)
      resizeObserver.observe(target);
    return () => {
      if (target)
        resizeObserver.unobserve(target);
    };
  });
  return (event, state2) => {
    state2.pointer.update((pointer) => {
      pointer.set(event.offsetX / width * 2 - 1, -(event.offsetY / height) * 2 + 1);
      return pointer;
    });
    state2.raycaster.setFromCamera(state2.pointer.current, camera.current);
  };
};
const useInteractivity = () => {
  const state = getContext("threlte-interactivity-context");
  const eventDispatcher = createRawEventDispatcher();
  const addInteractiveObject = (object) => {
    if (!state) {
      console.warn("No interactivity context found. Did you forget to implement interactivity()?");
      return;
    }
    object.userData._threlte_interactivity_dispatcher = eventDispatcher;
    if (state.interactiveObjects.find((obj) => obj.uuid === object.uuid))
      return;
    state.interactiveObjects.push(object);
  };
  const removeInteractiveObject = (object) => {
    if (!state) {
      console.warn("No interactivity context found. Did you forget to implement interactivity()?");
      return;
    }
    state.interactiveObjects = state.interactiveObjects.filter((obj) => obj.uuid !== object.uuid);
    delete object.userData._threlte_interactivity_dispatcher;
  };
  return {
    ...state,
    addInteractiveObject,
    removeInteractiveObject
  };
};
const useComponentHasEventHandlers = (eventNames) => {
  get_current_component();
  const hasEventHandlers = writable(false);
  return {
    hasEventHandlers
  };
};
const injectInteractivityPlugin = () => {
  injectPlugin("interactivity", ({ ref }) => {
    if (!ref.isObject3D)
      return;
    const { addInteractiveObject, removeInteractiveObject } = useInteractivity();
    const refStore = writable(ref);
    const { hasEventHandlers } = useComponentHasEventHandlers();
    watch([hasEventHandlers, refStore], ([hasEventHandlers2, ref2]) => {
      if (!hasEventHandlers2)
        return;
      addInteractiveObject(ref2);
      return () => removeInteractiveObject(ref2);
    });
    return {
      onRefChange(ref2) {
        refStore.set(ref2);
      }
    };
  });
};
const getRawEventDispatcher = (object) => {
  return object.userData._threlte_interactivity_dispatcher;
};
function getIntersectionId(event) {
  return (event.eventObject || event.object).uuid + "/" + event.index + event.instanceId;
}
const DOM_EVENTS = [
  ["click", false],
  ["contextmenu", false],
  ["dblclick", false],
  ["wheel", false],
  ["pointerdown", true],
  ["pointerup", true],
  ["pointerleave", true],
  ["pointerenter", true],
  ["pointermove", true],
  ["pointercancel", true]
];
const setupInteractivity = (state) => {
  function calculateDistance(event) {
    const dx = event.offsetX - state.initialClick[0];
    const dy = event.offsetY - state.initialClick[1];
    return Math.round(Math.sqrt(dx * dx + dy * dy));
  }
  function cancelPointer(intersections) {
    for (const hoveredObj of state.hovered.values()) {
      if (!intersections.length || !intersections.find((hit) => {
        return hit.object === hoveredObj.object && hit.index === hoveredObj.index && hit.instanceId === hoveredObj.instanceId;
      })) {
        const eventObject = hoveredObj.eventObject;
        state.hovered.delete(getIntersectionId(hoveredObj));
        const eventDispatcher = getRawEventDispatcher(eventObject);
        if (eventDispatcher) {
          const data = { ...hoveredObj, intersections };
          eventDispatcher("pointerout", data);
          eventDispatcher("pointerleave", data);
        }
      }
    }
  }
  const enabled = memoize(state.enabled);
  const getHits = () => {
    const duplicates = /* @__PURE__ */ new Set();
    const intersections = [];
    let hits = state.interactiveObjects.flatMap((obj) => enabled.current ? state.raycaster.intersectObject(obj, true) : []).sort((a, b) => a.distance - b.distance).filter((item) => {
      const id = getIntersectionId(item);
      if (duplicates.has(id))
        return false;
      duplicates.add(id);
      return true;
    });
    if (state.filter)
      hits = state.filter(hits, state);
    for (const hit of hits) {
      let eventObject = hit.object;
      while (eventObject) {
        if (getRawEventDispatcher(eventObject))
          intersections.push({ ...hit, eventObject });
        eventObject = eventObject.parent;
      }
    }
    return intersections;
  };
  function pointerMissed(event, objects) {
    for (let i = 0; i < objects.length; i++) {
      const eventDispatcher = getRawEventDispatcher(objects[i]);
      if (!eventDispatcher)
        continue;
      eventDispatcher("pointermissed", event);
    }
  }
  const getEventHandler = (name) => {
    if (name === "pointerleave" || name === "pointercancel") {
      return () => {
        state.pointerOverTarget.set(false);
        cancelPointer([]);
      };
    }
    if (name === "pointerenter") {
      return () => {
        state.pointerOverTarget.set(true);
      };
    }
    return (event) => {
      const isPointerMove = name === "pointermove";
      const isClickEvent = name === "click" || name === "contextmenu" || name === "dblclick";
      state.compute(event, state);
      const hits = getHits();
      const delta = isClickEvent ? calculateDistance(event) : 0;
      if (name === "pointerdown") {
        state.initialClick = [event.offsetX, event.offsetY];
        state.initialHits = hits.map((hit) => hit.eventObject);
      }
      if (isClickEvent && !hits.length) {
        if (delta <= 2) {
          pointerMissed(event, state.interactiveObjects);
        }
      }
      if (isPointerMove)
        cancelPointer(hits);
      let stopped = false;
      dispatchEvents:
        for (const hit of hits) {
          const intersectionEvent = {
            stopped,
            ...hit,
            intersections: hits,
            stopPropagation() {
              stopped = true;
              intersectionEvent.stopped = true;
              if (state.hovered.size && Array.from(state.hovered.values()).find((i) => i.eventObject === hit.eventObject)) {
                const higher = hits.slice(0, hits.indexOf(hit));
                cancelPointer([...higher, hit]);
              }
            },
            camera: state.raycaster.camera,
            delta,
            nativeEvent: event,
            pointer: state.pointer.current,
            ray: state.raycaster.ray
          };
          const eventDispatcher = getRawEventDispatcher(hit.eventObject);
          if (!eventDispatcher)
            return;
          if (isPointerMove) {
            if (eventDispatcher.hasEventListener("pointerover") || eventDispatcher.hasEventListener("pointerenter") || eventDispatcher.hasEventListener("pointerout") || eventDispatcher.hasEventListener("pointerleave")) {
              const id = getIntersectionId(intersectionEvent);
              const hoveredItem = state.hovered.get(id);
              if (!hoveredItem) {
                state.hovered.set(id, intersectionEvent);
                eventDispatcher("pointerover", intersectionEvent);
                eventDispatcher("pointerenter", intersectionEvent);
              } else if (hoveredItem.stopped) {
                intersectionEvent.stopPropagation();
              }
            }
            eventDispatcher("pointermove", intersectionEvent);
          } else {
            const hasEventListener = eventDispatcher.hasEventListener(name);
            if (hasEventListener) {
              if (!isClickEvent || state.initialHits.includes(hit.eventObject)) {
                pointerMissed(event, state.interactiveObjects.filter((object) => !state.initialHits.includes(object)));
                eventDispatcher(name, intersectionEvent);
              }
            } else {
              if (isClickEvent && state.initialHits.includes(hit.eventObject)) {
                pointerMissed(event, state.interactiveObjects.filter((object) => !state.initialHits.includes(object)));
              }
            }
          }
          if (stopped)
            break dispatchEvents;
        }
    };
  };
  const disconnect = (target) => {
    DOM_EVENTS.forEach(([eventName]) => {
      target.removeEventListener(eventName, getEventHandler(eventName));
    });
  };
  const connect = (target) => {
    DOM_EVENTS.forEach(([eventName, passive]) => {
      target.addEventListener(eventName, getEventHandler(eventName), { passive });
    });
  };
  watch(state.target, (target) => {
    if (target)
      connect(target);
    return () => {
      if (target)
        disconnect(target);
    };
  });
};
const interactivity = (options) => {
  const state = {
    enabled: currentWritable(options?.enabled ?? true),
    pointer: currentWritable(new Vector2()),
    pointerOverTarget: currentWritable(false),
    lastEvent: void 0,
    raycaster: new Raycaster(),
    initialClick: [0, 0],
    initialHits: [],
    hovered: /* @__PURE__ */ new Map(),
    interactiveObjects: [],
    target: currentWritable(options?.target ?? useThrelte().renderer.domElement),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    compute: () => {
    },
    filter: options?.filter
  };
  state.compute = options?.compute ?? getDefaultComputeFunction(state);
  setContext("threlte-interactivity-context", state);
  injectInteractivityPlugin();
  setupInteractivity(state);
  return state;
};
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i])
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const Scene = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $scale, $$unsubscribe_scale;
  interactivity();
  const scale = spring(1);
  $$unsubscribe_scale = subscribe(scale, (value) => $scale = value);
  let rotation = 0;
  useFrame((state, delta) => {
    rotation += delta;
  });
  $$unsubscribe_scale();
  return `${validate_component(T.PerspectiveCamera, "T.PerspectiveCamera").$$render(
    $$result,
    {
      makeDefault: true,
      position: [10, 10, 10]
    },
    {},
    {}
  )} ${validate_component(T.DirectionalLight, "T.DirectionalLight").$$render($$result, { position: [0, 10, 10] }, {}, {})} ${validate_component(T.AmbientLight, "T.AmbientLight").$$render($$result, { intensity: 0.5 }, {}, {})} ${validate_component(T.Mesh, "T.Mesh").$$render(
    $$result,
    {
      "rotation.y": rotation,
      "position.y": 1,
      scale: $scale,
      castShadow: true
    },
    {},
    {
      default: () => {
        return `${validate_component(T.BoxGeometry, "T.BoxGeometry").$$render($$result, { args: [1, 2, 1] }, {}, {})} ${validate_component(T.MeshStandardMaterial, "T.MeshStandardMaterial").$$render($$result, { color: "hotpink" }, {}, {})}`;
      }
    }
  )} ${validate_component(T.Mesh, "T.Mesh").$$render(
    $$result,
    {
      "rotation.x": -Math.PI / 2,
      receiveShadow: true
    },
    {},
    {
      default: () => {
        return `${validate_component(T.CircleGeometry, "T.CircleGeometry").$$render($$result, { args: [4, 40] }, {}, {})} ${validate_component(T.MeshStandardMaterial, "T.MeshStandardMaterial").$$render($$result, { color: "white" }, {}, {})}`;
      }
    }
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<figure>${validate_component(Canvas, "Canvas").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Theatre, "Theatre").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Scene, "Scene").$$render($$result, {}, {}, {})}`;
        }
      })}`;
    }
  })}</figure>`;
});
export {
  Page as P,
  studio as s,
  watch as w
};
