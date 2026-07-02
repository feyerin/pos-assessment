import type { Receipt } from "../types/receipt"

export function useReceiptPrinter() {
  const printReceipt = (
    receipt: Receipt,
    formatCurrency: (value: number) => string
  ) => {
    const w = window.open("", "", "width=320,height=700")
    if (!w) return

    const rows = receipt.items
      .map(
        item => `
          <tr>
            <td>
              ${item.name}<br>
              ${item.qty} x ${formatCurrency(item.price)}
            </td>
            <td class="right">
              ${formatCurrency(item.price * item.qty)}
            </td>
          </tr>
        `
      )
      .join("")

    w.document.write(`
<!DOCTYPE html>
<html>
<head>
<style>
body{
  width:280px;
  margin:auto;
  font-family:monospace;
  font-size:13px;
}

h2{
  text-align:center;
  margin-bottom:5px;
}

table{
  width:100%;
}

td{
  padding:4px 0;
}

.right{
  text-align:right;
}

hr{
  border:none;
  border-top:1px dashed #999;
  margin:10px 0;
}
</style>
</head>

<body>

<h2>POS CASHIER</h2>

<div style="text-align:center">
Receipt #${receipt.id}<br>
${receipt.date}
</div>

<hr>

<table>
${rows}
</table>

<hr>

<table>
<tr>
<td><b>Total</b></td>
<td class="right">
<b>${formatCurrency(receipt.total)}</b>
</td>
</tr>
</table>

<hr>

<div style="text-align:center">
Thank You ❤️
</div>

</body>
</html>
`)

    w.document.close()

    setTimeout(() => {
      w.print()
      w.close()
    }, 300)
  }

  return {
    printReceipt,
  }
}