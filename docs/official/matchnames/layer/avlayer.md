# AVLayer Match Names

---

## Layer

|   Match Name    | Display Name (EN) |
| --------------- | ----------------- |
| `ADBE AV Layer` |                   |

---

## Top-Level

|       Match Name       |  Display Name (EN)   |
| ---------------------- | -------------------- |
| `ADBE Marker`          | Marker               |
| `ADBE Time Remapping`  | Time Remap           |
| `ADBE MTrackers`       | Motion Trackers      |
| `ADBE Mask Parade`     | Masks                |
| `ADBE Effect Parade`   | Effects              |
| `ADBE Layer Overrides` | Essential Properties |


---

## Transform

|       Match Name       | Display Name (EN) |
| ---------------------- | ----------------- |
| `ADBE Transform Group` | Transform         |
| `ADBE Anchor Point`    | Anchor Point      |
| `ADBE Position`        | Position          |
| `ADBE Position_0`      | X Position        |
| `ADBE Position_1`      | Y Position        |
| `ADBE Position_2`      | Z Position        |
| `ADBE Scale`           | Scale             |
| `ADBE Orientation`     | Orientation       |
| `ADBE Rotate X`        | X Rotation        |
| `ADBE Rotate Y`        | Y Rotation        |
| `ADBE Rotate Z`        | Z Rotation        |
| `ADBE Opacity`         | Opacity           |

---

## Material Options (3D)

See also: [3d Layer Match Names](3dlayer.md)

|            Match Name            |   Display Name (EN)   |
| ------------------------------- | --------------------- |
| `ADBE Material Options Group`   | Material Options      |
| `ADBE Casts Shadows`            | Casts Shadows         |
| `ADBE Accepts Shadows`          | Accepts Shadows       |
| `ADBE Accepts Lights`           | Accepts Lights        |
| `ADBE Appears in Reflections`   | Appears in Reflections |

Example usage:

```javascript
layer
  .property("ADBE Material Options Group")
  .property("ADBE Accepts Lights")
  .setValue(true);
```

---

## Audio

|     Match Name      | Display Name (EN) |
| ------------------- | ----------------- |
| `ADBE Audio Group`  | Audio             |
| `ADBE Audio Levels` | Audio Levels      |

---

## Essential Properties

|          Match Name           | Display Name (EN) |
| ----------------------------- | ----------------- |
| `ADBE Layer Source Alternate` |                   |
