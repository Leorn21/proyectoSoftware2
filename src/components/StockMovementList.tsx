import { StockMovement } from '../types';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface StockMovementListProps {
  movements: StockMovement[];
  onDelete: (id: string) => void;
  productUnit: string;
}

/**
 * Trazabilidad REQ-F03:
 * Presenta el historial de ingresos y egresos de un lote para explicar los
 * cambios de cantidad disponible.
 */
export const StockMovementList = ({
  movements,
  onDelete,
  productUnit
}: StockMovementListProps) => {
  if (movements.length === 0) {
    return (
      <Card className="border-dashed border-slate-700/80 bg-slate-950/50">
        <CardContent className="p-8 text-center">
          <p className="text-slate-400">No hay movimientos registrados para este lote.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80">
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Tipo</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Cantidad</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Razón</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Fecha</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id} className="border-b border-slate-900 transition-colors hover:bg-slate-900/60">
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      movement.type === 'ingreso'
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-rose-500/15 text-rose-300'
                    }`}
                  >
                    {movement.type === 'ingreso' ? '+ Ingreso' : '- Egreso'}
                  </span>
                </td>
                <td className="px-4 py-4 font-medium text-slate-200">
                  {movement.quantity} {productUnit}
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {movement.reason || '-'}
                </td>
                <td className="px-4 py-4 text-xs text-slate-400">
                  {movement.createdAt.toLocaleDateString('es-ES')} {' '}
                  {movement.createdAt.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-4 py-4">
                  <ConfirmDialog
                    title="Eliminar movimiento"
                    description="Se eliminará este registro del historial del lote."
                    onConfirm={() => onDelete(movement.id)}
                    trigger={
                      <Button variant="destructive" size="sm">
                        Eliminar
                      </Button>
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
