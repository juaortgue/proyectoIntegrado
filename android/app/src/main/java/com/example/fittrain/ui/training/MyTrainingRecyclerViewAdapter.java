package com.example.fittrain.ui.training;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.fittrain.R;
import com.example.fittrain.model.TrainingResponse;
import com.example.fittrain.ui.training.TrainingFragment.OnListFragmentInteractionListener;
import com.example.fittrain.ui.training.dummy.DummyContent.DummyItem;

import java.util.List;

/**
 * {@link RecyclerView.Adapter} that can display a {@link DummyItem} and makes a call to the
 * specified {@link OnListFragmentInteractionListener}.
 * TODO: Replace the implementation with code for your data type.
 */
public class MyTrainingRecyclerViewAdapter extends RecyclerView.Adapter<MyTrainingRecyclerViewAdapter.ViewHolder> {

    private final List<TrainingResponse> mValues;
    private final Context ctx;

    public MyTrainingRecyclerViewAdapter(Context context, List<TrainingResponse> trainingList) {
        this.ctx = context;
        this.mValues=trainingList;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_training, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        /*holder.mItem = mValues.get(position);
        holder.mContentView.setText(mValues.get(position).content);*/

    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mContentView;
        public DummyItem mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mContentView = (TextView) view.findViewById(R.id.content);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mContentView.getText() + "'";
        }
    }
}
